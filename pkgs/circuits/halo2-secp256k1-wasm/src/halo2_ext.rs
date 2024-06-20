use std::io::BufReader;

use crate::{
    consts::{E, E_AFFINE, F},
    utils::ct_option_ok_or,
};
use anyhow::{anyhow, Context, Ok, Result};
use halo2_base::{
    gates::circuit::builder::BaseCircuitBuilder,
    halo2_proofs::{
        halo2curves::ff::PrimeField,
        plonk::{verify_proof, VerifyingKey},
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
    halo2::{PoseidonTranscript, POSEIDON_SPEC},
    NativeLoader,
};

pub trait Halo2WasmExt {
    #[cfg(target_arch = "wasm32")]
    fn get_instance_values(&mut self, col: usize) -> JsValue;

    #[cfg(not(target_arch = "wasm32"))]
    fn get_instance_values_ext(&mut self, col: usize) -> Result<Vec<u8>>;

    fn verify_ext(
        &self,
        instance_values: Vec<[u8; 32]>,
        proof: &[u8],
        params: ParamsKZG<E>,
    ) -> Result<bool>;
}

impl Halo2WasmExt for Halo2Wasm {
    #[cfg(target_arch = "wasm32")]
    fn get_instance_values(&mut self, col: usize) -> JsValue {
        self.get_instance_values(col)
    }

    #[cfg(not(target_arch = "wasm32"))]
    fn get_instance_values_ext(&mut self, col: usize) -> Result<Vec<u8>> {
        let instance_values = self
            .public
            .get(col)
            .context("Failed to get instances")?
            .iter()
            .flat_map(|x| x.value().to_repr())
            .collect_vec();

        Ok(instance_values)
    }

    fn verify_ext(
        &self,
        instances: Vec<[u8; 32]>,
        proof: &[u8],
        params: ParamsKZG<E>,
    ) -> Result<bool> {
        // Convert instances
        let instances = instances
            .iter()
            .map(|bytes| {
                let instance = ct_option_ok_or(
                    F::from_bytes(bytes),
                    anyhow!("Failed to convert instances into F."),
                )?;

                Ok(instance)
            })
            .collect::<Result<Vec<F>>>()?;
        let instances = vec![instances];
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
