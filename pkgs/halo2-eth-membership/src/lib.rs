#![allow(non_snake_case)]
use anyhow::{anyhow, Context, Result};
use halo2_base::{halo2_proofs::halo2curves::secp256k1, utils::ScalarField};
use halo2_ecdsa::utils::verify::verify_efficient_ecdsa;
use halo2_wasm::Halo2Wasm;
use halo2_wasm_ext::{
    config::{configure_halo2_wasm, read_config_from_str},
    ext::Halo2WasmExt,
    instances::set_instances,
    params::{gen_params, serialize_params_to_bytes},
};
use num_bigint::BigUint;
use serde::{Deserialize, Serialize};
use serde_wasm_bindgen::from_value;
use utils::{
    circuit::create_circuit,
    consts::{INSTANCE_COL, K},
    prove::generate_proof,
};
use wasm_bindgen::prelude::*;

pub mod eth_membership;
pub mod utils;

// Include the generated file containing the embedded configuration data
include!(concat!(env!("OUT_DIR"), "/eth_membership_config.rs"));

// `AnonklubProof` consists of a Halo2 proof
// This proof is serialized and passed around in the JavaScript runtime.
#[derive(Serialize, Deserialize)]
pub struct EthMembershipProof {
    pub proof: Vec<u8>,
    pub public: Vec<u8>,
    r: Vec<u8>,
    msg_hash: Vec<u8>,
    is_y_odd: bool,
}

impl EthMembershipProof {
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

#[wasm_bindgen]
pub fn prove_membership(
    s: &[u8],
    r: &[u8],
    is_y_odd: bool,
    msg_hash: &[u8],
    merkle_proof_bytes_serialized: &[u8],
) -> Vec<u8> {
    // Initialize and configure Halo2Wasm
    let mut halo2_wasm = Halo2Wasm::new();

    // Configure halo2-wasm
    // Initialize the config and the circuit
    let circuit_config = read_config_from_str(ETH_MEMBERSHIP_CONFIG).expect("Could not read Circuit Config");
    halo2_wasm.config(circuit_config);

    // Initialize a Membership proof
    let mut eth_membership_proof = EthMembershipProof::new(r.to_vec(), msg_hash.to_vec(), is_y_odd);

    let mut circuit = create_circuit(
        s,
        r,
        msg_hash,
        is_y_odd,
        merkle_proof_bytes_serialized,
        &halo2_wasm,
    )
    .map_err(|e| anyhow!(e))
    .expect("Failed to create circuit.");

    // Set public inputs
    let instances = circuit.instances.clone();
    set_instances(&mut halo2_wasm, instances.clone(), INSTANCE_COL);

    // Load Params
    let params = gen_params(K);
    halo2_wasm.load_params(&serialize_params_to_bytes(&params));

    // Generate VK
    halo2_wasm.gen_vk();

    // Generate PK
    halo2_wasm.gen_pk();

    // Generate the proof
    let proof = generate_proof::<secp256k1::Fp, secp256k1::Fq, secp256k1::Secp256k1Affine>(
        &mut circuit,
        &halo2_wasm,
    )
    .map_err(|e| anyhow!(e))
    .expect("Failed to generate proof.");

    let public = from_value::<Vec<u8>>(halo2_wasm.get_instance_values(INSTANCE_COL))
        .expect("Failed to deserialize instance values.");

    // Serialize Membership proof
    eth_membership_proof.set_proof(proof, public.clone());

    eth_membership_proof
        .serialize()
        .map_err(|e| anyhow!(e))
        .expect("Failed to serialize EthMembershipProof.")
}

#[wasm_bindgen]
pub fn verify_membership(membership_proof: &[u8], instances: &[u8]) -> bool {
    // Initialize and configure Halo2Wasm
    let mut halo2_wasm = Halo2Wasm::new();
    let params = gen_params(K);
    let _ = configure_halo2_wasm(&mut halo2_wasm, &params);

    // Deserialize Membership proof
    let membership_proof = EthMembershipProof::deserialize(membership_proof)
        .map_err(|e| anyhow!(e))
        .expect("Failed to deserialize the proof");

    // Deserialize the inputs
    let r = secp256k1::Fq::from_bytes_le(&membership_proof.r);
    let msg_hash = BigUint::from_bytes_be(&membership_proof.msg_hash);
    let is_y_odd = membership_proof.is_y_odd;
    let proof = membership_proof.proof;

    // Verifications
    let is_proof_valid = halo2_wasm
        .verify_ext(instances, &proof, params)
        .map_err(|e| anyhow!(e))
        .expect("Failed to verify snark proof.");

    let is_eff_ecdsa_valid = verify_efficient_ecdsa(msg_hash, r, is_y_odd, instances)
        .map_err(|e| anyhow!(e))
        .expect("Failed to verify efficient ECDSA.");

    is_proof_valid && is_eff_ecdsa_valid
}
