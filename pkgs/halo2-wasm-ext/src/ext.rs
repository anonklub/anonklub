#![allow(non_camel_case_types)]
use crate::{
    consts::{E, E_AFFINE, F},
    utils::ct_option_ok_or,
};
use anyhow::{anyhow, Context, Ok, Result};
use halo2_base::{
    gates::circuit::builder::BaseCircuitBuilder,
    halo2_proofs::{
        halo2curves::ff::PrimeField,
        plonk::{verify_proof, ProvingKey, VerifyingKey},
        poly::{
            commitment::ParamsProver,
            kzg::{
                commitment::{KZGCommitmentScheme, ParamsKZG},
                multiopen::VerifierSHPLONK,
                strategy::SingleStrategy,
            },
        },
        SerdeFormat,
    },
};
use halo2_wasm::Halo2Wasm;
use itertools::Itertools;
use snark_verifier_sdk::{
    halo2::{gen_snark_shplonk, PoseidonTranscript, POSEIDON_SPEC},
    NativeLoader,
};
use std::io::BufReader;

pub trait Halo2WasmExt {
    fn get_instance_values_ext(&mut self, col: usize) -> Result<Vec<u8>>;
    fn prove_ext(&self, params: &ParamsKZG<E>) -> Vec<u8>;
    fn verify_ext(&self, instances: &[u8], proof: &[u8], params: ParamsKZG<E>) -> Result<bool>;
}

impl Halo2WasmExt for Halo2Wasm {
    fn get_instance_values_ext(&mut self, col: usize) -> Result<Vec<u8>> {
        Ok(self
            .public
            .get(col)
            .context("Failed to get instances")?
            .iter()
            .flat_map(|instance| instance.value().to_repr().to_vec())
            .collect())
    }

    fn prove_ext(&self, params: &ParamsKZG<E>) -> Vec<u8> {
        let pk = self.get_pk();
        let circuit_params = self.circuit_params.clone().unwrap();
        let pk = ProvingKey::<E_AFFINE>::read::<BufReader<&[u8]>, BaseCircuitBuilder<F>>(
            &mut BufReader::new(&pk),
            SerdeFormat::RawBytesUnchecked,
            circuit_params,
        )
        .unwrap();
        let circuit = self.circuit.borrow().deep_clone();
        let snark = gen_snark_shplonk(params, &pk, circuit, None::<&str>);
        snark.proof
    }

    fn verify_ext(&self, instances: &[u8], proof: &[u8], params: ParamsKZG<E>) -> Result<bool> {
        // Deserialize instances into Native scalar Field
        let instances = instances
            .chunks(32)
            .map(|chunk| {
                let bytes: [u8; 32] = chunk.try_into().expect("slice with incorrect length");
                let instance = ct_option_ok_or(
                    F::from_bytes(&bytes),
                    anyhow!("Failed to convert instances into F."),
                )?;
                Ok(instance)
            })
            .collect::<Result<Vec<F>>>()?;

        let instances = [instances];
        let instances = instances.iter().map(Vec::as_slice).collect_vec();

        // Get BaseCircuitParams
        let circuit_params = self.circuit_params.clone().unwrap();

        // Getting the VK
        let vk = self.get_vk();
        let vk_reader = &mut BufReader::new(vk.as_slice());
        let vk = VerifyingKey::<E_AFFINE>::read::<BufReader<&[u8]>, BaseCircuitBuilder<F>>(
            vk_reader,
            SerdeFormat::RawBytesUnchecked,
            circuit_params,
        )?;

        // Get Params
        let verifier_params = params.verifier_params();
        let mut transcript_read =
            PoseidonTranscript::<NativeLoader, &[u8]>::from_spec(proof, POSEIDON_SPEC.clone());

        Ok(
            verify_proof::<KZGCommitmentScheme<E>, VerifierSHPLONK<'_, E>, _, _, _>(
                verifier_params,
                &vk,
                SingleStrategy::new(verifier_params),
                &[&instances],
                &mut transcript_read,
            )
            .map_err(|e| anyhow!(e))
            .context("Failed to verify the proof")
            .is_ok(),
        )
    }
}
