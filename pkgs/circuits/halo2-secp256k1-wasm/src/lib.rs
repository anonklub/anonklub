#![allow(non_snake_case)]
use anyhow::{anyhow, Context, Ok, Result};
use consts::{INSTANCE_COL, K};
use halo2_base::{halo2_proofs::halo2curves::secp256k1, utils::ScalarField};
use halo2_ext::Halo2WasmExt;
use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, Halo2Wasm};
use num_bigint::BigUint;
use serde::{Deserialize, Serialize};
use utils::{
    configure_halo2_wasm, create_circuit, gen_params, generate_proof, set_instances,
    verify_eff_ecdsa,
};

pub(crate) mod consts;
pub mod ecdsa;
pub mod eff_ecdsa;
pub(crate) mod halo2_ext;
pub mod recovery;
pub(crate) mod utils;

// `AnonklubProof` consists of a Halo2 proof
// This proof is serialized and passed around in the JavaScript runtime.
#[derive(Serialize, Deserialize)]
pub struct MembershipProof {
    pub proof: Vec<u8>,
    pub public: Vec<u8>,
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

    pub fn set_proof(&mut self, proof: Vec<u8>, public: Vec<u8>) {
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
    let params = gen_params(K);
    let _ = configure_halo2_wasm(&mut halo2_wasm, &params);

    // Initialize a Membership proof
    let mut membership_proof = MembershipProof::new(r.to_vec(), msg_hash.to_vec(), is_y_odd);

    // Deserialize the inputs
    let s = secp256k1::Fq::from_bytes_le(s);
    let r = secp256k1::Fq::from_bytes_le(r);
    let msg_hash = BigUint::from_bytes_be(msg_hash);

    let mut circuit = create_circuit(s, r, msg_hash, is_y_odd, &halo2_wasm)?;

    // Set public inputs
    let public = circuit.instances.clone();

    //set_instances(&mut halo2_wasm, public.clone(), INSTANCE_COL);

    // Generate the proof
    let proof =
        generate_proof::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>(&mut circuit, &halo2_wasm)?;

    let public = halo2_wasm.get_instance_values_ext(INSTANCE_COL)?;

    // Serialize Membership proof
    membership_proof.set_proof(proof, public.clone());

    let membership_proof_serialized = membership_proof.serialize()?;

    Ok(membership_proof_serialized)
}

pub fn verify_membership(membership_proof: &[u8], instances: &[u8]) -> Result<bool> {
    // Initialize and configure Halo2Wasm
    let mut halo2_wasm = Halo2Wasm::new();
    let params = gen_params(K);
    let _ = configure_halo2_wasm(&mut halo2_wasm, &params);

    // Deserialize Membership proof
    let membership_proof = MembershipProof::deserialize(membership_proof)
        .map_err(|e| anyhow!(e))
        .context("Failed to deserialize the proof!")?;

    // Deserialize the inputs
    let r = secp256k1::Fq::from_bytes_le(&membership_proof.r);
    let msg_hash = BigUint::from_bytes_be(&membership_proof.msg_hash);
    let is_y_odd = membership_proof.is_y_odd;
    let proof = membership_proof.proof;

    // Deserialize instances
    let instances = instances
        .chunks(32)
        .map(|chunk| chunk.try_into().expect("slice with incorrect length"))
        .collect::<Vec<[u8; 32]>>();

    // Verifications
    let is_proof_valid = halo2_wasm.verify_ext(instances.clone(), &proof, params)?;

    let is_eff_ecdsa_valid = verify_eff_ecdsa(msg_hash, r, is_y_odd, instances.clone())?;

    Ok(is_proof_valid && is_eff_ecdsa_valid)
}
