use crate::{
    consts::{E, K},
    ecdsa::Secp256k1VerifyCircuit,
    eff_ecdsa::{EffECDSAInputs, EffECDSAVerifyCircuit},
    recovery::recover_pk_eff,
    utils::serialize_params_to_bytes,
};
use anyhow::{anyhow, Context, Result};
use halo2_base::{
    halo2_proofs::{
        arithmetic::CurveAffine,
        halo2curves::{bn256::Bn256, pairing::Engine, secp256k1},
        plonk::{Circuit, ProvingKey},
        poly::kzg::commitment::ParamsKZG,
    },
    utils::{BigPrimeField, CurveAffineExt, ScalarField},
};
use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, CircuitConfig, Halo2Wasm};
use num_bigint::BigUint;
use rand::rngs::StdRng;
use rand_core::OsRng;
use serde::{Deserialize, Serialize};
use std::fs::File;
use wasm_bindgen::prelude::wasm_bindgen;

// `AnonklubProof` consists of a Halo2 proof
// This proof is serialized and passed around in the JavaScript runtime.
#[derive(Serialize, Deserialize)]
pub struct AnonklubProof {
    pub proof: Vec<u8>,
    r: secp256k1::Fq,
    is_y_odd: bool,
    msg_hash: BigUint,
}

#[wasm_bindgen]
pub fn prove_membership(s: &[u8], r: &[u8], msg_hash: &[u8], is_y_odd: bool) -> Result<Vec<u8>> {
    // Initialize the config and the circuit
    let config = read_config("configs/ecdsa.config")?;

    let halo2_wasm = initialize_halo2_wasm::<E>(&config)?;

    let circuit = create_circuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>(
        s,
        r,
        msg_hash,
        is_y_odd,
        &halo2_wasm,
    )?;

    // Generate the proof
    let proof = generate_proof(&circuit, &halo2_wasm)?;

    // Serialize Anonklub proof.
    let anonklub_proof = AnonklubProof {
        proof,
        r,
        is_y_odd,
        msg_hash,
    };

    let mut anonklub_proof_serialized = Vec::<u8>::new();
    anonklub_proof
        .serialize(&mut anonklub_proof_serialized)
        .map_err(|e| anyhow!(e))
        .context("Failed to serialize the proof!")?;

    Ok(anonklub_proof_serialized)
}

#[wasm_bindgen]
pub fn verify_membership(anonklub_proof: &[u8]) -> Result<bool> {
    // Initialize the config and the circuit
    let config = read_config("configs/ecdsa.config")?;

    let halo2_wasm = initialize_halo2_wasm::<E>(&config)?;

    // Get the public input from the proof
    let anonklub_proof = AnonklubProof::deserialize(anonklub_proof)
        .map_err(|e| anyhow!(e))
        .context("Failed to deserialize the proof!")?;

    let circuit = create_circuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>(
        anonklub_proof.s,
        anonklub_proof.r,
        anonklub_proof.msg_hash,
        anonklub_proof.is_y_odd,
        &halo2_wasm,
    )?;

    verify_proof::<E>(&anonklub_proof.proof)?

    // Verify the efficient ECDSA input
}

fn read_config(path: &str) -> Result<CircuitConfig> {
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

fn create_circuit<CF, SF, GA>(
    s: &[u8],
    r: &[u8],
    msg_hash: &[u8],
    is_y_odd: bool,
    halo2_wasm: &Halo2Wasm,
) -> Result<EffECDSAVerifyCircuit<CF, SF, GA>>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    // Deserialize the inputs
    let s = secp256k1::Fq::from_bytes_le(s);
    let r = secp256k1::Fq::from_bytes_le(r);

    // Compute the efficient ECDSA inputs
    let (U, T) = recover_pk_eff(msg_hash, r, is_y_odd).context("Failed to recover the PK!")?;

    let msg_hash = secp256k1::Fq::from_bytes_le(msg_hash);

    let ecdsa_inputs = EffECDSAInputs::new(s, pk, T, U);

    let circuit = EffECDSAVerifyCircuit::<CF, SF, GA>::new(&halo2_wasm, ecdsa_inputs)
        .map_err(|e| anyhow!(e))
        .context("Failed to initialize the circuit!")?;

    Ok(circuit)
}

fn generate_params<E>(k: usize) -> Result<ParamsKZG<E>>
where
    E: Engine,
{
    let params = ParamsKZG::<E>::setup(K, OsRng);

    Ok(params)
}

fn initialize_halo2_wasm<E>(config: &CircuitConfig) -> Result<&mut Halo2Wasm>
where
    E: Engine,
{
    let mut halo2_wasm = Halo2Wasm::new();

    halo2_wasm.config(*config);

    // Get Circuit Stats
    let circuit_stats = halo2_wasm.get_circuit_stats();

    // Generate Params based on the circuit stats
    let params = generate_params::<E>(K)?;

    // Load params
    halo2_wasm.load_params(&serialize_params_to_bytes(&params));

    // Generate VK
    halo2_wasm.gen_vk();

    // Generate PK
    halo2_wasm.gen_pk();

    Ok(&mut halo2_wasm)
}

fn generate_proof<E, CF, SF, GA>(
    mut circuit: EffECDSAVerifyCircuit<CF, SF, GA>,
    halo2_wasm: &Halo2Wasm,
) -> Result<Vec<u8>>
where
    E: Engine,
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

fn verify_proof<E>(anonklub_proof: &[u8], halo2_wasm: &Halo2Wasm) -> Result<bool> {
    let verification = halo2_wasm.verify(anonklub_proof);

    match verification {
        Err(_) => Ok(false),
        Ok(_) => Ok(true),
    }
}
