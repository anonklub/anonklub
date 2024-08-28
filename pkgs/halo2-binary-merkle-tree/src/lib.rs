use anyhow::{Context, Ok, Result};
use binary_merkle_tree::{BinaryMerkleTree, MerkleProof};
use binary_merkle_tree_2::BinaryMerkleTree2;
use consts::{RATE, R_F, R_P, T};
use halo2_base::utils::ScalarField;
use halo2_wasm_ext::consts::F;
use pse_poseidon::Poseidon;
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

pub mod binary_merkle_tree;
pub mod binary_merkle_tree_2;
pub mod consts;
pub mod gadget;

// chore trigger ci
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

    let eth_membership_tree = BinaryMerkleTree2::<F, T, RATE>::new(&mut poseidon, &mut leaves)
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

    std::result::Result::Ok(
        _generate_merkle_proof_2(leaves, leaf, depth)
            .map_err(|_e| JsValue::from_str("Could not generate merkle proof"))?
            .to_bytes_le()
            .map_err(|_e| JsValue::from_str("Could not encode merkle proof"))?
            .serialize()
            .map_err(|_e| JsValue::from_str("Could not serialize merkle proof bytes"))?,
    )
}

#[cfg(test)]
mod tests {
    use std::{fs::File, io::Read};

    use crate::binary_merkle_tree::MerkleProofBytes;
    use anyhow::Result;
    use serde::Deserialize;

    use super::generate_merkle_proof;

    const DEPTH: usize = 3;

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
                        9, 195, 56, 186, 143, 23, 96, 0, 0, 0, 0, 0, 0, 0, 59, 61, 190, 216, 110,
                        209, 240, 87, 127, 184, 82, 236, 236, 57, 28, 224, 13, 78, 7, 93, 175, 144,
                        129, 253, 255, 35, 233, 51, 85, 176, 99, 38, 71, 34, 60, 132, 137, 171, 15,
                        187, 166, 27, 142, 147, 100, 250, 182, 145, 133, 119, 121, 174, 69, 188,
                        181, 34, 92, 72, 168, 101, 107, 176, 97, 36, 19, 174, 200, 32, 196, 141,
                        101, 98, 189, 243, 132, 156, 252, 15, 114, 183, 107, 166, 187, 169, 126,
                        219, 147, 205, 158, 251, 235, 92, 56, 0, 231, 1, 96, 0, 0, 0, 0, 0, 0, 0,
                        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0,
                        0, 0, 0, 0, 135, 78, 162, 64, 29, 177, 202, 225, 143, 5, 12, 102, 4, 25,
                        73, 62, 71, 70, 178, 83, 3, 177, 4, 70, 165, 195, 63, 114, 124, 33, 235,
                        24
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

    // This test unit is meant only for dev purposes
    // which you can add your real address and leaves
    // So you can compare the results with the UI results.
    //
    // #[derive(Deserialize)]
    // struct TestInputs {
    //     leaves: Vec<String>,
    //     leaf: String,
    //     depth: usize,
    // }
    // #[test]
    // fn mock_generate_merkle_proof() {
    //     // Read the test inputs from the JSON file
    //     let mut file =
    //         File::open("mock/test_inputs.json").expect("Failed to open test inputs file.");
    //     let mut data = String::new();
    //     file.read_to_string(&mut data)
    //         .expect("Failed to read test inputs file.");
    //     // Parse the JSON data
    //     let inputs: TestInputs = serde_json::from_str(&data).expect("Failed to parse JSON.");
    //     let result = generate_merkle_proof(inputs.leaves, inputs.leaf, inputs.depth);
    //     match result {
    //         Ok(result) => {
    //             assert_eq!(
    //                 result,
    //                 vec![
    //                     THE COMPUTED VALUE ACCORDING TO YOUR TESTS
    //                 ]
    //             )
    //         }
    //         Err(e) => panic!("Expected to succeed, got error: {}", e),
    //     }
    // }
}
