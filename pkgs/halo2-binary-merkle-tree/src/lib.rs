extern crate console_error_panic_hook;

use anyhow::{Context, Ok, Result};
use binary_merkle_tree::{BinaryMerkleTree, MerkleProof};
use binary_merkle_tree_2::BinaryMerkleTree2;
use consts::{RATE, R_F, R_P, T};
use gloo_utils::format::JsValueSerdeExt;
use halo2_base::utils::ScalarField;
use halo2_wasm_ext::consts::F;
use hex::decode;
use pse_poseidon::Poseidon;
use serde::Serialize;

/// Adding this exception because wasm_bindgen
/// is being used in generate_merkle_proof that has
/// #[cfg(target_arch = "wasm32")] flag which is not
/// readable by `cargo clippy` so we get unused import warn
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

pub mod binary_merkle_tree;
pub mod binary_merkle_tree_2;
pub mod consts;
pub mod gadget;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

fn log_jsvalue(value: &impl Serialize) {
    let js_value = JsValue::from_serde(value).unwrap();
    log(&format!("{:?}", js_value));
}

fn _generate_merkle_proof(leaves: Vec<String>, leaf: String, depth: usize) -> Result<MerkleProof> {
    let mut padded_leaves = leaves.clone();
    // Pad the leaves to equal the size of the tree
    // Needs to be an even string
    padded_leaves.resize(1 << depth, "00".to_string());

    let mut poseidon = Poseidon::<F, T, RATE>::new(R_F, R_P);
    let mut binary_merkle_tree = BinaryMerkleTree::<T, RATE>::new(&mut poseidon);

    for padded_leaf in &padded_leaves {
        binary_merkle_tree.insert(F::from_bytes_le(
            &hex::decode(padded_leaf.replace("0x", ""))
                .with_context(|| format!("could not decode hex for leaf {}", padded_leaf))?,
        ));
    }

    binary_merkle_tree.finish();

    let leaf_prime_field = F::from_bytes_le(
        &hex::decode(leaf.replace("0x", ""))
            .with_context(|| format!("could not decode hex for leaf {}", leaf))?,
    );

    Ok(binary_merkle_tree
        .gen_proof(leaf_prime_field, leaf)
        .map_err(|e| anyhow::anyhow!(e))?)
}

fn _generate_merkle_proof_2(
    leaves: Vec<String>,
    leaf: String,
    depth: usize,
) -> Result<MerkleProof> {
    let mut poseidon = Poseidon::<F, T, RATE>::new(R_F, R_P);

    let tree_size = usize::pow(2, depth.try_into().unwrap());

    let mut padded_leaves = leaves.clone();
    // Pad the leaves to equal the size of the tree
    // Needs to be an even string
    padded_leaves.resize(1 << depth, "00".to_string());

    let mut leaves = Vec::<F>::new();

    let mut leaf_index: usize = 0;

    for i in 0..tree_size {
        if leaf.eq(&padded_leaves[i]) {
            leaf_index = i;
        }

        let another_leaf_bytes = hex::decode(padded_leaves[i].replace("0x", ""))
            .with_context(|| format!("could not decode hex for leaf {}", padded_leaves[i]))?;
        let another_leaf = F::from_bytes_le(&another_leaf_bytes);

        poseidon.update(&[another_leaf]);

        leaves.push(poseidon.squeeze_and_reset());
    }

    let mut eth_membership_tree = BinaryMerkleTree2::<F, T, RATE>::new(&mut poseidon, &mut leaves)
        .expect("Failed to construct membership tree.");

    let root = eth_membership_tree.get_root();

    let (siblings, path_indices) = eth_membership_tree.get_proof(leaf_index);

    let proof = MerkleProof {
        depth,
        leaf: leaves[leaf_index],
        siblings,
        path_indices,
        root,
    };

    Ok(proof)
}

#[cfg(not(target_arch = "wasm32"))]
pub fn generate_merkle_proof(leaves: Vec<String>, leaf: String, depth: usize) -> Result<Vec<u8>> {
    Ok(_generate_merkle_proof_2(leaves, leaf, depth)
        .map_err(|e| anyhow::anyhow!(e))?
        .to_bytes_le()
        .context("could not encode merkle proof into bytes")?
        .serialize()
        .context("could not serialize merkle proof bytes")?)
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn generate_merkle_proof(
    leaves: Vec<String>,
    leaf: String,
    depth: usize,
) -> std::result::Result<Vec<u8>, JsValue> {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
    log("Starting generate_merkle_proof");

    let result = _generate_merkle_proof_2(leaves.clone(), leaf.clone(), depth);
    match result {
        std::result::Result::Ok(proof) => {
            log("Generated Merkle proof successfully");
            match proof.to_bytes_le() {
                std::result::Result::Ok(bytes) => {
                    log("Serialized Merkle proof to bytes successfully");
                    match bytes.serialize() {
                        std::result::Result::Ok(serialized_bytes) => {
                            log("Serialized Merkle proof bytes successfully");
                            std::result::Result::Ok(serialized_bytes)
                        }
                        std::result::Result::Err(_) => {
                            log("Failed to serialize Merkle proof bytes");
                            Err(JsValue::from_str("Could not serialize merkle proof bytes"))
                        }
                    }
                }
                std::result::Result::Err(_) => {
                    log("Failed to encode Merkle proof to bytes");
                    std::result::Result::Err(JsValue::from_str("Could not encode merkle proof"))
                }
            }
        }
        std::result::Result::Err(_) => {
            log("Failed to generate Merkle proof");
            std::result::Result::Err(JsValue::from_str("Could not generate Merkle proof"))
        }
    }
}

#[cfg(test)]
mod tests {
    use std::{fs::File, io::Read};

    use crate::binary_merkle_tree::MerkleProofBytes;
    use anyhow::Result;
    use serde::Deserialize;

    use super::generate_merkle_proof;

    const DEPTH: usize = 3;

    #[derive(Deserialize)]
    struct TestInputs {
        leaves: Vec<String>,
        leaf: String,
        depth: usize,
    }

    #[test]
    fn fail_to_generate_merkle_proof_if_not_hex() {
        let leaves = vec!["wxyz".to_string(), "hjkl".to_string()];
        let result = generate_merkle_proof(leaves, "wxyz".to_string(), DEPTH);

        match result {
            Ok(_) => panic!("Expected to fail"),
            Err(e) => assert_eq!(e.to_string(), "could not decode hex for leaf wxyz"),
        }
    }

    #[test]
    fn fail_to_generate_merkle_proof() {
        let leaves = vec!["wxyz".to_string(), "hjkl".to_string()];
        let result = generate_merkle_proof(leaves.clone(), "wxy1".to_string(), DEPTH);

        match result {
            Ok(_) => panic!("Expected to fail"),
            Err(e) => assert_eq!(e.to_string(), "could not decode hex for leaf wxyz"),
        }
    }

    #[test]
    fn can_generate_merkle_proof() {
        let leaves = vec![
            "0x4567".to_string(),
            "0x4517".to_string(),
            "0x1234".to_string(),
            "0x4561".to_string(),
        ];
        let result = generate_merkle_proof(leaves.clone(), "0x1234".to_string(), DEPTH);

        // TODO: the poseidon hasher output here is different from the output in Spartan version.
        // Which I think because of the different consts configured in Poseidon.
        match result {
            Ok(result) => {
                assert_eq!(
                    result,
                    vec![
                        3, 32, 0, 0, 0, 0, 0, 0, 0, 42, 197, 108, 148, 84, 67, 196, 15, 25, 44,
                        187, 80, 215, 172, 73, 102, 62, 128, 225, 207, 103, 245, 142, 211, 162, 74,
                        9, 195, 56, 186, 143, 23, 96, 0, 0, 0, 0, 0, 0, 0, 217, 43, 176, 139, 167,
                        198, 94, 5, 141, 201, 182, 46, 36, 127, 101, 216, 133, 12, 216, 35, 20, 4,
                        71, 244, 194, 207, 253, 188, 133, 114, 16, 24, 164, 141, 100, 3, 224, 224,
                        70, 113, 42, 42, 220, 172, 7, 153, 103, 249, 150, 183, 242, 248, 69, 254,
                        91, 235, 101, 91, 248, 17, 156, 181, 168, 40, 19, 174, 200, 32, 196, 141,
                        101, 98, 189, 243, 132, 156, 252, 15, 114, 183, 107, 166, 187, 169, 126,
                        219, 147, 205, 158, 251, 235, 92, 56, 0, 231, 1, 96, 0, 0, 0, 0, 0, 0, 0,
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0,
                        0, 0, 0, 0, 124, 190, 171, 55, 16, 139, 126, 125, 206, 12, 5, 89, 159, 225,
                        213, 162, 66, 137, 66, 156, 153, 170, 224, 16, 174, 170, 138, 223, 111, 54,
                        99, 15
                    ]
                )
            }
            Err(e) => panic!("Expected to succeed, got error: {}", e),
        }
    }

    #[test]
    fn can_generate_merkle_root() -> Result<()> {
        let leaves = vec![
            "0x12".to_string(),
            "0xfe".to_string(),
            "0x4912de".to_string(),
        ];
        let result = generate_merkle_proof(leaves.clone(), "0x12".to_string(), DEPTH)?;
        let merkle_proof_bytes = MerkleProofBytes::deserialize(&result);

        match merkle_proof_bytes {
            Err(e) => panic!("Expected to succeed, got error {}", e),
            Ok(merkle_proof_bytes) => {
                assert_eq!(
                    merkle_proof_bytes.root,
                    vec![
                        36, 251, 99, 153, 227, 224, 66, 241, 82, 155, 247, 26, 92, 64, 113, 8, 94,
                        163, 22, 56, 106, 0, 27, 92, 120, 190, 179, 121, 33, 249, 89, 18
                    ]
                )
            }
        }

        Ok(())
    }

    #[test]
    fn mock_generate_merkle_proof() {
        // Read the test inputs from the JSON file
        let mut file =
            File::open("mock/test_inputs.json").expect("Failed to open test inputs file.");
        let mut data = String::new();
        file.read_to_string(&mut data)
            .expect("Failed to read test inputs file.");

        // Parse the JSON data
        let inputs: TestInputs = serde_json::from_str(&data).expect("Failed to parse JSON.");

        let result = generate_merkle_proof(inputs.leaves, inputs.leaf, inputs.depth);

        // TODO: the poseidon hasher output here is different from the output in Spartan version.
        // Which I think because of the different consts configured in Poseidon.
        match result {
            Ok(result) => {
                assert_eq!(
                    result,
                    vec![
                        15, 32, 0, 0, 0, 0, 0, 0, 0, 4, 211, 98, 142, 16, 211, 129, 209, 105, 25,
                        122, 222, 54, 238, 49, 171, 33, 223, 1, 124, 228, 171, 216, 219, 75, 120,
                        38, 168, 244, 217, 2, 17, 224, 1, 0, 0, 0, 0, 0, 0, 190, 218, 37, 77, 225,
                        105, 130, 203, 168, 196, 45, 64, 247, 192, 174, 133, 154, 67, 131, 115, 11,
                        134, 162, 149, 79, 59, 86, 149, 131, 25, 217, 14, 5, 27, 114, 99, 230, 34,
                        120, 43, 110, 109, 138, 193, 36, 24, 174, 95, 91, 143, 156, 59, 98, 208,
                        60, 195, 32, 78, 26, 240, 106, 159, 246, 2, 70, 203, 36, 40, 168, 224, 52,
                        48, 80, 94, 231, 119, 221, 54, 60, 5, 198, 158, 53, 209, 15, 54, 78, 58,
                        22, 84, 18, 129, 157, 60, 18, 42, 84, 42, 71, 118, 29, 38, 195, 141, 126,
                        178, 233, 71, 129, 181, 226, 82, 6, 146, 138, 49, 103, 46, 26, 170, 45,
                        163, 71, 47, 137, 68, 253, 18, 154, 247, 166, 70, 118, 100, 248, 138, 115,
                        151, 23, 13, 170, 62, 207, 221, 87, 46, 208, 207, 154, 243, 59, 176, 32, 4,
                        101, 84, 62, 5, 3, 36, 4, 173, 132, 37, 88, 188, 64, 21, 185, 241, 153,
                        239, 243, 203, 205, 37, 217, 41, 56, 178, 5, 189, 38, 224, 219, 19, 4, 236,
                        41, 85, 250, 11, 146, 201, 44, 96, 10, 244, 235, 74, 92, 226, 135, 98, 134,
                        52, 68, 168, 222, 161, 217, 61, 214, 49, 230, 49, 201, 190, 113, 214, 114,
                        81, 185, 37, 183, 214, 205, 238, 217, 229, 191, 124, 148, 237, 67, 236,
                        101, 97, 155, 76, 208, 78, 235, 41, 172, 210, 69, 110, 96, 158, 199, 125,
                        230, 94, 79, 39, 140, 24, 114, 108, 179, 0, 138, 53, 78, 74, 54, 89, 45,
                        191, 215, 176, 106, 38, 179, 79, 61, 161, 41, 118, 209, 14, 116, 49, 11,
                        181, 165, 33, 202, 107, 24, 239, 231, 20, 194, 209, 75, 101, 195, 170, 186,
                        63, 107, 191, 222, 182, 210, 176, 152, 248, 165, 132, 49, 130, 157, 148,
                        13, 231, 6, 5, 56, 91, 168, 89, 164, 110, 96, 135, 75, 73, 251, 119, 109,
                        23, 130, 1, 158, 174, 247, 69, 201, 10, 246, 185, 203, 129, 205, 17, 126,
                        176, 108, 17, 204, 253, 166, 230, 95, 16, 119, 168, 29, 250, 72, 61, 19,
                        217, 212, 180, 103, 188, 223, 207, 23, 64, 100, 13, 237, 152, 73, 238, 30,
                        242, 71, 14, 87, 86, 246, 75, 255, 145, 126, 214, 191, 142, 140, 69, 229,
                        165, 230, 61, 212, 233, 126, 54, 24, 232, 166, 197, 86, 23, 224, 249, 49,
                        102, 1, 7, 154, 151, 9, 208, 66, 162, 77, 173, 248, 16, 166, 237, 186, 179,
                        67, 44, 132, 230, 197, 34, 182, 139, 234, 211, 219, 232, 36, 97, 42, 11,
                        250, 45, 59, 40, 54, 124, 6, 88, 155, 200, 30, 191, 2, 149, 79, 200, 41,
                        127, 209, 121, 222, 237, 127, 76, 108, 186, 254, 71, 170, 7, 127, 170, 25,
                        24, 224, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 174,
                        245, 50, 124, 8, 117, 78, 174, 197, 167, 143, 89, 218, 122, 144, 164, 155,
                        37, 6, 66, 247, 212, 92, 137, 255, 193, 26, 204, 136, 246, 191, 3
                    ]
                )
            }
            Err(e) => panic!("Expected to succeed, got error: {}", e),
        }
    }
}
