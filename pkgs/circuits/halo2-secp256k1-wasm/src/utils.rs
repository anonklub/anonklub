#![allow(non_snake_case)]
use crate::{
    consts::{CF, E, F},
    eff_ecdsa::{EffECDSAInputs, EffECDSAVerifyCircuit},
    recovery::recover_pk_eff,
};
use anyhow::{anyhow, Context, Result};
use halo2_base::{
    halo2_proofs::{
        halo2curves::secp256k1,
        poly::{commitment::Params, kzg::commitment::ParamsKZG},
    },
    utils::{biguint_to_fe, fe_to_biguint, BigPrimeField, CurveAffineExt},
};
use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, CircuitConfig, Halo2Wasm};
use num_bigint::BigUint;
use rand_core::OsRng;
use snark_verifier::util::arithmetic::{CurveAffine, PrimeField};
use std::{fs::File, io::Cursor, result::Result as StdResult, str::from_utf8};
use subtle::CtOption;

/// @src https://github.com/privacy-scaling-explorations/zkevm-circuits/blob/main/eth-types/src/sign_types.rs
/// Helper function to convert a `CtOption` into an `Result`.  Similar to
/// `Option::ok_or`.
/// TODO: switch to anyhow result
pub fn ct_option_ok_or<T, E>(v: CtOption<T>, err: E) -> StdResult<T, E> {
    Option::<T>::from(v).ok_or(err)
}

pub fn to_bigint(s: &str) -> BigUint {
    let chunks = s[2..]
        .as_bytes()
        .chunks(16)
        .rev()
        .map(|chunk| from_utf8(chunk).unwrap())
        .map(|s| u64::from_str_radix(s, 16).unwrap())
        .collect::<Vec<_>>();

    let mut bigint = BigUint::from(0u64);
    let base: BigUint = BigUint::from(2u64).pow(64);

    // Construct biguint from chunks
    for (i, value) in chunks.iter().enumerate() {
        bigint += BigUint::from(*value) * &base.pow(i as u32);
    }

    bigint
}

/// @src https://github.com/privacy-scaling-explorations/zkevm-circuits/blob/main/eth-types/src/sign_types.rs#L155
/// Return a copy of the serialized public key with swapped Endianness.
pub fn pk_bytes_swap_endianness<T: Clone>(actual_pk: &[T]) -> [T; 64] {
    assert_eq!(actual_pk.len(), 64);
    let mut pk_swap = <&[T; 64]>::try_from(actual_pk)
        .cloned()
        .expect("actual_pk.len() != 64");
    pk_swap[..32].reverse();
    pk_swap[32..].reverse();
    pk_swap
}

pub fn serialize_params_to_bytes(params: &ParamsKZG<E>) -> Vec<u8> {
    let mut buf = Vec::new();
    let mut cursor = Cursor::new(&mut buf);

    // Hypothetical write method, replace with the actual method to serialize ParamsKZG<Bn256>
    params.write(&mut cursor).expect("Serialization failed");

    buf
}

/// Wasm helpers
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
) -> Result<EffECDSAVerifyCircuit<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>> {
    // Compute the efficient ECDSA inputs
    // TODO: Generalize recover_pk_eff
    let (U, T) = recover_pk_eff(msg_hash, r, is_y_odd).context("Failed to recover the PK!")?;

    let ecdsa_inputs = EffECDSAInputs::new(s, T, U);

    let circuit = EffECDSAVerifyCircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
        &halo2_wasm,
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
    halo2_wasm.load_params(&serialize_params_to_bytes(&params));

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

pub fn generate_proof<CF, SF, GA>(
    circuit: &mut EffECDSAVerifyCircuit<CF, SF, GA>,
    halo2_wasm: &Halo2Wasm,
) -> Result<Vec<u8>>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    circuit
        .verify_signature()
        .map_err(|e| anyhow!(e))
        .context("The circuit failed to verify signature!")?;

    // Generate proof
    let proof = halo2_wasm.prove();

    Ok(proof)
}

pub fn verify_eff_ecdsa(
    msg_hash: BigUint,
    r: secp256k1::Fq,
    is_y_odd: bool,
    instances: Vec<[u8; 32]>,
) -> Result<bool> {
    // Convert instances
    let instances = instances
        .iter()
        .map(|bytes| {
            let instance = ct_option_ok_or(
                secp256k1::Fp::from_repr(*bytes),
                anyhow!("Failed to convert instances into F."),
            )?;

            Ok(instance)
        })
        .collect::<Result<Vec<CF>>>()?;

    let T = ct_option_ok_or(
        Secp256k1Affine::from_xy(instances[0], instances[1]),
        anyhow!("Failed to convert T into CF"),
    )?;
    let U = ct_option_ok_or(
        Secp256k1Affine::from_xy(instances[2], instances[3]),
        anyhow!("Failed to convert U into CF"),
    )?;

    let (expected_U, expected_T) = recover_pk_eff(msg_hash, r, is_y_odd)?;

    Ok(T == expected_T && U == expected_U)
}
