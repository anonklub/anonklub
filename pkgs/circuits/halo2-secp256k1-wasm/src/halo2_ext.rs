use crate::consts::{E, E_AFFINE, F};
use anyhow::{anyhow, Context, Ok, Result};
use halo2_base::halo2_proofs::{
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
};
use halo2_wasm::Halo2Wasm;
use itertools::Itertools;
use rand_core::OsRng;
use snark_verifier_sdk::{
    halo2::{PoseidonTranscript, POSEIDON_SPEC},
    NativeLoader,
};
use wasm_bindgen::JsValue;

pub trait Halo2WasmExt {
    #[cfg(target_arch = "wasm32")]
    fn get_instance_values(&mut self, col: usize) -> JsValue;

    #[cfg(not(target_arch = "wasm32"))]
    fn get_instance_values_ext(&mut self, col: usize) -> Result<Vec<u8>>;

    fn verify(&self, instance_values: &[u8], proof: &[u8], params: ParamsKZG<E>) -> Result<bool>;
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

    fn verify(&self, instance_values: &[u8], proof: &[u8], params: ParamsKZG<E>) -> Result<bool> {
        // Deserialize instances
        let instances = instance_values
            .chunks(32)
            .map(|chunk| chunk.try_into().expect("slice with incorrect length"))
            .collect::<Vec<[u8; 32]>>();

        let instances = instances
            .iter()
            .map(|bytes| F::from_bytes(bytes))
            .collect::<Vec<F>>();

        let vk = self.get_vk();
        let vk =
            VerifyingKey::<E_AFFINE>::read::<_, SerdeFormat>(&vk, SerdeFormat::RawBytesUnchecked)?;
        let verifier_params = params.verifier_params();
        let mut transcript_read =
            PoseidonTranscript::<NativeLoader, &[u8]>::from_spec(proof, POSEIDON_SPEC);

        let x = verify_proof::<KZGCommitmentScheme<E>, VerifierSHPLONK<'_, E>, _, _, _>(
            verifier_params,
            &vk,
            SingleStrategy::new(verifier_params),
            &[&instances],
            &mut transcript_read,
        );
    }
}
