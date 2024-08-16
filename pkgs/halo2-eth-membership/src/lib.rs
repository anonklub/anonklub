#![allow(non_snake_case)]
use anyhow::{anyhow, Context, Result};
use halo2_base::{
    halo2_proofs::{
        halo2curves::{bn256::Bn256, secp256k1},
        poly::{commitment::Params, kzg::commitment::ParamsKZG},
    },
    utils::ScalarField,
};
use halo2_ecdsa::utils::verify::verify_efficient_ecdsa;
use halo2_wasm::Halo2Wasm;
use halo2_wasm_ext::{config::read_config_from_str, ext::Halo2WasmExt};
use num_bigint::BigUint;
use serde::{Deserialize, Serialize};
use std::io::BufReader;
use utils::{
    circuit::{create_circuit, create_default_circuit},
    consts::INSTANCE_COL,
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
    vk: Vec<u8>,
    r: Vec<u8>,
    msg_hash: Vec<u8>,
    is_y_odd: bool,
}

impl EthMembershipProof {
    pub fn new(r: Vec<u8>, msg_hash: Vec<u8>, is_y_odd: bool) -> Self {
        Self {
            proof: vec![],
            public: vec![],
            vk: vec![],
            r,
            msg_hash,
            is_y_odd,
        }
    }

    pub fn set_proof(&mut self, proof: Vec<u8>, public: Vec<u8>, vk: Vec<u8>) {
        self.proof = proof;
        self.public = public;
        self.vk = vk
    }

    pub fn serialize(&self) -> Result<Vec<u8>> {
        bincode::serialize(self).context("Failed to serialize MembershipProof")
    }

    pub fn deserialize(serialized: &[u8]) -> Result<Self> {
        bincode::deserialize(serialized).context("Failed to deserialize MembershipProof")
    }
}

fn _prove(
    s: &[u8],
    r: &[u8],
    is_y_odd: bool,
    msg_hash: &[u8],
    merkle_proof_bytes_serialized: &[u8],
    params: &[u8],
) -> Vec<u8> {
    // Initialize and configure Halo2Wasm
    let mut halo2_wasm = Halo2Wasm::new();

    // Configure halo2-wasm
    // Initialize the config and the circuit
    let circuit_config =
        read_config_from_str(ETH_MEMBERSHIP_CONFIG).expect("Could not read Circuit Config");
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

    circuit.verify_membership();

    // Set public inputs
    halo2_wasm.set_instances(&circuit.instances, INSTANCE_COL);

    halo2_wasm.assign_instances();

    // Load Params
    halo2_wasm.load_params(params);

    // Generate VK
    halo2_wasm.gen_vk();

    // Generate PK
    halo2_wasm.gen_pk();

    // Generate the proof
    let public = halo2_wasm
        .get_instance_values_ext(INSTANCE_COL)
        .expect("Failed to deserialize instance values.");

    // Generate proof based on the target architecture
    let proof = if cfg!(target_arch = "wasm32") {
        halo2_wasm.prove()
    } else {
        let params = ParamsKZG::<Bn256>::read(&mut BufReader::new(params))
            .expect("Failed to generate params");
        halo2_wasm.prove_ext(&params)
    };

    let vk_encoded = halo2_wasm.get_vk();

    // let _is_verified = halo2_wasm
    //     .verify_ext(&public, &proof, params)
    //     .expect("Failed to verify");

    // Serialize Membership proof
    eth_membership_proof.set_proof(proof, public.clone(), vk_encoded);

    eth_membership_proof
        .serialize()
        .map_err(|e| anyhow!(e))
        .expect("Failed to serialize EthMembershipProof.")
}

fn _verify(membership_proof: &[u8], params: &[u8]) -> bool {
    // Initialize and configure Halo2Wasm
    let mut halo2_wasm = Halo2Wasm::new();

    // Configure halo2-wasm
    // Initialize the config and the circuit
    let circuit_config =
        read_config_from_str(ETH_MEMBERSHIP_CONFIG).expect("Could not read Circuit Config");
    halo2_wasm.config(circuit_config);

    // Deserialize Membership proof
    let membership_proof = EthMembershipProof::deserialize(membership_proof)
        .map_err(|e| anyhow!(e))
        .expect("Failed to deserialize the proof");

    // Deserialize the inputs
    let r = secp256k1::Fp::from_bytes_le(&membership_proof.r);
    let msg_hash = BigUint::from_bytes_be(&membership_proof.msg_hash);
    let is_y_odd = membership_proof.is_y_odd;

    // Create default circuit
    let default_circuit = create_default_circuit(&halo2_wasm)
        .map_err(|e| anyhow!(e))
        .expect("Failed to create default circuit.");

    // Load Params
    halo2_wasm.load_params(params);

    let params =
        ParamsKZG::<Bn256>::read(&mut BufReader::new(params)).expect("Failed to generate params");

    // Load VK
    halo2_wasm.load_vk(&membership_proof.vk);

    // Verifications
    let is_proof_valid = halo2_wasm
        .verify_ext(&membership_proof.public, &membership_proof.proof, params)
        .map_err(|e| anyhow!(e))
        .expect("Failed to verify snark proof.");

    let is_eff_ecdsa_valid =
        verify_efficient_ecdsa(msg_hash, r, is_y_odd, &membership_proof.public)
            .map_err(|e| anyhow!(e))
            .expect("Failed to verify efficient ECDSA.");

    is_proof_valid && is_eff_ecdsa_valid
}

#[cfg(not(target_arch = "wasm32"))]
pub fn prove_membership(
    s: &[u8],
    r: &[u8],
    is_y_odd: bool,
    msg_hash: &[u8],
    merkle_proof_bytes_serialized: &[u8],
    params: &[u8],
) -> Vec<u8> {
    _prove(
        s,
        r,
        is_y_odd,
        msg_hash,
        merkle_proof_bytes_serialized,
        params,
    )
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn prove_membership(
    s: &[u8],
    r: &[u8],
    is_y_odd: bool,
    msg_hash: &[u8],
    merkle_proof_bytes_serialized: &[u8],
    params: &[u8],
) -> Vec<u8> {
    _prove(
        s,
        r,
        is_y_odd,
        msg_hash,
        merkle_proof_bytes_serialized,
        params,
    )
}

#[cfg(not(target_arch = "wasm32"))]
pub fn verify_membership(membership_proof: &[u8], params: &[u8]) -> bool {
    _verify(membership_proof, params)
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn verify_membership(membership_proof: &[u8], params: &[u8]) -> bool {
    _verify(membership_proof, params)
}

#[cfg(test)]
mod tests {
    use super::*;

    use halo2_wasm_ext::instances::set_instances;
    use serde::Deserialize;
    use std::{collections::HashMap, fs::File, io::Read};

    fn map_to_vec(map: &HashMap<String, u8>) -> Vec<u8> {
        let mut vec: Vec<u8> = vec![0; map.len()];
        for (key, value) in map {
            let index: usize = key.parse().expect("Failed to parse key to usize");
            vec[index] = *value;
        }
        vec
    }

    fn prove_membership_mock(
        s: &[u8],
        r: &[u8],
        is_y_odd: bool,
        msg_hash: &[u8],
        merkle_proof_bytes_serialized: &[u8],
    ) -> Result<()> {
        // Initialize and configure Halo2Wasm
        let mut halo2_wasm = Halo2Wasm::new();

        // Configure halo2-wasm
        // Initialize the config and the circuit
        let circuit_config =
            read_config_from_str(ETH_MEMBERSHIP_CONFIG).expect("Could not read Circuit Config");
        halo2_wasm.config(circuit_config);

        // Initialize a Membership proof
        let eth_membership_proof = EthMembershipProof::new(r.to_vec(), msg_hash.to_vec(), is_y_odd);

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

        circuit.verify_membership();

        halo2_wasm.set_instances(&circuit.instances, INSTANCE_COL);
        halo2_wasm.assign_instances();

        halo2_wasm.mock();

        Ok(())
    }

    #[derive(Deserialize)]
    struct ProveTestInputs {
        s: HashMap<String, u8>,
        r: HashMap<String, u8>,
        is_y_odd: bool,
        msg_hash: HashMap<String, u8>,
        merkle_proof_bytes_serialized: HashMap<String, u8>,
    }

    #[derive(Deserialize)]
    struct VerifyTestInputs {
        membership_proof: HashMap<String, u8>,
    }

    mod native_tests {
        use super::*;

        #[test]
        fn test_prove_membership_mock() {
            // Read the test inputs from the JSON file
            let mut file = File::open("mock/prove_test_inputs.json")
                .expect("Failed to open test inputs file.");
            let mut data = String::new();
            file.read_to_string(&mut data)
                .expect("Failed to read test inputs file.");

            // Parse the JSON data
            let inputs: ProveTestInputs =
                serde_json::from_str(&data).expect("Failed to parse JSON.");

            // Convert HashMaps to Vec<u8>
            let s = map_to_vec(&inputs.s);
            let r = map_to_vec(&inputs.r);
            let msg_hash = map_to_vec(&inputs.msg_hash);
            let merkle_proof_bytes_serialized = map_to_vec(&inputs.merkle_proof_bytes_serialized);

            // Call the function to be tested
            prove_membership_mock(
                &s,
                &r,
                inputs.is_y_odd,
                &msg_hash,
                &merkle_proof_bytes_serialized,
            )
            .expect("Failed to prove");

            // Here you can add assertions to verify the result
            assert_eq!((), ());
        }
    }

    #[cfg(all(not(target_arch = "wasm32"), feature = "tokio_tests"))]
    #[cfg(test)]
    mod e2e_tests {
        use utils::fetch_kzg_params;

        use super::*;

        #[tokio::test]
        async fn test_prove_and_verify_membership_real() {
            // Read the test inputs from the JSON file
            let file = File::open("mock/prove_test_inputs.json")
                .expect("Failed to open test inputs file.");
            let mut data = String::new();
            file.read_to_string(&mut data)
                .expect("Failed to read test inputs file.");

            // Parse the JSON data
            let inputs: ProveTestInputs =
                serde_json::from_str(&data).expect("Failed to parse JSON.");

            // Convert HashMaps to Vec<u8>
            let s = map_to_vec(&inputs.s);
            let r = map_to_vec(&inputs.r);
            let msg_hash = map_to_vec(&inputs.msg_hash);
            let merkle_proof_bytes_serialized = map_to_vec(&inputs.merkle_proof_bytes_serialized);

            // Get KZG params
            let params = fetch_kzg_params(K).await.expect("Failed to fetch params");

            // Generate the proof
            let membership_proof = prove_membership(
                &s,
                &r,
                inputs.is_y_odd,
                &msg_hash,
                &merkle_proof_bytes_serialized,
                &params,
            );

            assert_eq!(membership_proof.is_empty(), false);

            // Verify the proof
            let is_verified = verify_membership(&membership_proof, &params);

            assert_eq!(is_verified, true);
        }

        #[tokio::test]
        async fn test_verify_membership_mock() {
            // Read the test inputs from the JSON file
            let mut file = File::open("mock/verify_test_inputs.json")
                .expect("Failed to open test inputs file.");
            let mut data = String::new();
            file.read_to_string(&mut data)
                .expect("Failed to read test inputs file.");

            // Parse the JSON data
            let inputs: VerifyTestInputs =
                serde_json::from_str(&data).expect("Failed to parse JSON.");

            // Get KZG params
            let params = fetch_kzg_params(K).await.expect("Failed to fetch params");

            let membership_proof = map_to_vec(&inputs.membership_proof);

            // Call the function to be tested
            let result = verify_membership(&membership_proof, &params);

            // Here you can add assertions to verify the result
            assert_eq!(result, true);
        }
    }
}
