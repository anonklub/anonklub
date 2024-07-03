#![allow(non_camel_case_types)]
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
use std::io::BufReader;
use std::result::Result as StdResult;
use subtle::CtOption;

use super::{
    consts::{E, E_AFFINE, F},
    ct_option_ok_or,
};

// Scaler field of the E curve
type E = Bn256;
type E_AFFINE = G1Affine;
type F = bn256::Fr; // Scalar Native FF;

/// @src https://github.com/privacy-scaling-explorations/zkevm-circuits/blob/main/eth-types/src/sign_types.rs
/// Helper function to convert a `CtOption` into an `Result`.  Similar to
/// `Option::ok_or`.
/// TODO: switch to anyhow result
fn ct_option_ok_or<T, E>(v: CtOption<T>, err: E) -> StdResult<T, E> {
    Option::<T>::from(v).ok_or(err)
}

pub trait Halo2WasmExt {
    #[cfg(target_arch = "wasm32")]
    fn get_instance_values(&mut self, col: usize) -> JsValue;

    #[cfg(not(target_arch = "wasm32"))]
    fn get_instance_values_ext(&mut self, col: usize) -> Result<Vec<u8>>;

    fn verify_ext(&self, instances: &[u8], proof: &[u8], params: ParamsKZG<E>) -> Result<bool>;
}

impl Halo2WasmExt for Halo2Wasm {
    #[cfg(target_arch = "wasm32")]
    fn get_instance_values(&mut self, col: usize) -> JsValue {
        self.get_instance_values(col)
    }

    #[cfg(not(target_arch = "wasm32"))]
    fn get_instance_values_ext(&mut self, col: usize) -> Result<Vec<u8>> {
        Ok(self
            .public
            .get(col)
            .context("Failed to get instances")?
            .iter()
            .flat_map(|instance| instance.value().to_repr().to_vec())
            .collect())
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
            ,
        )
    }
}
