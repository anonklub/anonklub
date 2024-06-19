#![allow(non_snake_case)]
use crate::{
    consts::{E, INSTANCE_COL, K},
    eff_ecdsa::{EffECDSAInputs, EffECDSAVerifyCircuit},
    halo2_ext::Halo2WasmExt,
    recovery::recover_pk_eff,
    utils::serialize_params_to_bytes,
};
use anyhow::{anyhow, Context, Ok, Result};
use halo2_base::{
    halo2_proofs::{halo2curves::secp256k1, poly::kzg::commitment::ParamsKZG},
    utils::{BigPrimeField, CurveAffineExt, ScalarField},
};
use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, CircuitConfig, Halo2Wasm};
use num_bigint::BigUint;
use rand_core::OsRng;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::panic::{catch_unwind, AssertUnwindSafe};

// `AnonklubProof` consists of a Halo2 proof
// This proof is serialized and passed around in the JavaScript runtime.
#[derive(Serialize, Deserialize)]
pub struct MembershipProof {
    pub proof: Vec<u8>,
    pub public: [u8; 32],
    r: Vec<u8>,
    msg_hash: Vec<u8>,
    is_y_odd: bool,
}

impl MembershipProof {
    pub fn new(r: Vec<u8>, msg_hash: Vec<u8>, is_y_odd: bool) -> Self {
        Self {
            proof: vec![],
            public: vec![],
            r,
            msg_hash,
            is_y_odd,
        }
    }

    pub fn set_proof(&mut self, proof: Vec<u8>, public: [u8; 32]) {
        self.proof = proof;
        self.public = public;
    }

    pub fn serialize(&self) -> Result<Vec<u8>> {
        bincode::serialize(self).context("Failed to serialize MembershipProof")
    }

    pub fn deserialize(serialized: &[u8]) -> Result<Self> {
        bincode::deserialize(serialized).context("Failed to deserialize MembershipProof")
    }
}

pub fn prove_membership(s: &[u8], r: &[u8], msg_hash: &[u8], is_y_odd: bool) -> Result<Vec<u8>> {
    // Initialize and configure Halo2Wasm
    let mut halo2_wasm = Halo2Wasm::new();
    let _ = configure_halo2_wasm(&mut halo2_wasm, K);

    // Initialize a Membership proof
    let mut membership_proof = MembershipProof::new(r.to_vec(), msg_hash.to_vec(), is_y_odd);

    // Deserialize the inputs
    let s = secp256k1::Fq::from_bytes_le(s);
    let r = secp256k1::Fq::from_bytes_le(r);
    let msg_hash = BigUint::from_bytes_be(msg_hash);

    let mut circuit = create_circuit(s, r, msg_hash, is_y_odd, &halo2_wasm)?;

    // Set public inputs
    let public = circuit.public.clone();

    set_instances(&mut halo2_wasm, public.clone(), INSTANCE_COL);

    // Generate the proof
    let proof =
        generate_proof::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>(&mut circuit, &halo2_wasm)?;

    let public = halo2_wasm.get_instance_values_ext(INSTANCE_COL);

    // Serialize Membership proof
    membership_proof.set_proof(proof, public.clone());

    let membership_proof_serialized = membership_proof.serialize()?;

    Ok(membership_proof_serialized)
}

pub fn verify_membership(membership_proof: &[u8]) -> Result<bool> {
    // Initialize and configure Halo2Wasm
    let mut halo2_wasm = Halo2Wasm::new();
    let _ = configure_halo2_wasm(&mut halo2_wasm, K);

    // Deserialize Membership proof
    let membership_proof = MembershipProof::deserialize(membership_proof)
        .map_err(|e| anyhow!(e))
        .context("Failed to deserialize the proof!")?;

    // Set public inputs
    let public = membership_proof.public.clone();

    set_instances(&mut halo2_wasm, public.clone(), INSTANCE_COL);

    let verification_result = catch_unwind(AssertUnwindSafe(|| {
        halo2_wasm.verify(&membership_proof.proof)
    }))
    .is_ok();

    // TODO: extract the `T` and `U` from the public inputs
    // And verify_eff_ecdsa

    Ok(verification_result)
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

fn create_circuit(
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

fn configure_halo2_wasm(halo2_wasm: &mut Halo2Wasm, k: u32) -> Result<()> {
    // Initialize the config and the circuit
    let config = read_config("configs/ecdsa.config")?;

    halo2_wasm.config(config);

    // Generate Params based on the circuit stats
    let params = ParamsKZG::<E>::setup(k, OsRng);

    // Load params
    halo2_wasm.load_params(&serialize_params_to_bytes(&params));

    // Generate VK
    halo2_wasm.gen_vk();

    // Generate PK
    halo2_wasm.gen_pk();

    Ok(())
}

fn set_instances(halo2_wasm: &mut Halo2Wasm, instances: Vec<u32>, col: usize) {
    halo2_wasm.set_instances(&instances, col);
    halo2_wasm.assign_instances();
}

fn get_instances(halo2_wasm: &mut Halo2Wasm, col: usize) -> Vec<u32> {
    halo2_wasm.get_instances(col)
}

fn generate_proof<CF, SF, GA>(
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

fn verify_eff_ecdsa(
    msg_hash: BigUint,
    r: secp256k1::Fq,
    is_y_odd: bool,
    T: Secp256k1Affine,
    U: Secp256k1Affine,
) -> Result<bool> {
    let (expected_U, expected_T) = recover_pk_eff(msg_hash, r, is_y_odd)?;

    Ok(T == expected_T && U == expected_U)
}
