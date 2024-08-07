use std::{fs::File, io::Cursor};

use anyhow::{anyhow, Context, Result};
use halo2_base::halo2_proofs::{
    halo2curves::secp256k1,
    poly::{commitment::Params, kzg::commitment::ParamsKZG},
};
use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, CircuitConfig, Halo2Wasm};
use num_bigint::BigUint;
use rand_core::OsRng;

use crate::circuits::efficient_ecdsa::{EfficientECDSACircuit, EfficientECDSAInputs};

use super::{consts::E, recovery::recover_pk_efficient};

pub fn serialize_params_to_bytes(params: &ParamsKZG<E>) -> Vec<u8> {
    let mut buf = Vec::new();
    let mut cursor = Cursor::new(&mut buf);

    params.write(&mut cursor).expect("Serialization failed");

    buf
}

pub fn read_config(path: &str) -> Result<CircuitConfig> {
    // Read circuit config
    let config = serde_json::from_reader(
        File::open(path)
            .map_err(|e| anyhow!(e))
            .with_context(|| format!("The circuit config file does not exist: {}", path))?,
    )
    .map_err(|e| anyhow!(e))
    .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

    Ok(config)
}

pub fn create_circuit(
    s: secp256k1::Fq,
    r: secp256k1::Fq,
    msg_hash: BigUint,
    is_y_odd: bool,
    halo2_wasm: &Halo2Wasm,
) -> Result<EfficientECDSACircuit<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>> {
    // Compute the efficient ECDSA inputs
    // TODO: Generalize recover_pk_efficient
    let (U, T) =
        recover_pk_efficient(msg_hash, r, is_y_odd).context("Failed to recover the PK!")?;

    let ecdsa_inputs = EfficientECDSAInputs::new(s, T, U);

    let circuit = EfficientECDSACircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
        halo2_wasm,
        ecdsa_inputs,
    )
    .map_err(|e| anyhow!(e))
    .context("Failed to initialize the circuit!")?;

    Ok(circuit)
}

pub fn configure_halo2_wasm(halo2_wasm: &mut Halo2Wasm, params: &ParamsKZG<E>) -> Result<()> {
    // Initialize the config and the circuit
    let config = read_config("configs/ecdsa.config")?;
    halo2_wasm.config(config);

    // Load params
    halo2_wasm.load_params(&serialize_params_to_bytes(params));

    // Generate VK
    halo2_wasm.gen_vk();

    // Generate PK
    halo2_wasm.gen_pk();

    Ok(())
}

pub fn gen_params(k: u32) -> ParamsKZG<E> {
    // Generate Params based on the circuit stats
    ParamsKZG::<E>::setup(k, OsRng)
}

pub fn set_instances(halo2_wasm: &mut Halo2Wasm, instances: Vec<u32>, col: usize) {
    halo2_wasm.set_instances(&instances, col);
    halo2_wasm.assign_instances();
}

pub fn get_instances(halo2_wasm: &mut Halo2Wasm, col: usize) -> Vec<u32> {
    halo2_wasm.get_instances(col)
}
