use anyhow::{Context, Ok, Result};
use binary_merkle_tree::{BinaryMerkleTree, MerkleProof};
use consts::{ARITY, RATE, R_F, R_P, T};
use halo2_base::utils::ScalarField;
use halo2_wasm_ext::consts::F;
use pse_poseidon::Poseidon;
/// Adding this exception because wasm_bindgen
/// is being used in generate_merkle_proof that has
/// #[cfg(target_arch = "wasm32")] flag which is not
/// readable by `cargo clippy` so we get unused import warn
#[allow(unused_imports)]
use wasm_bindgen::prelude::wasm_bindgen;

pub mod binary_merkle_tree;
pub mod consts;
pub mod gadget;
pub mod binary_merkle_tree_2;
//pub mod binary_merkle_tree_2;

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

#[cfg(not(target_arch = "wasm32"))]
pub fn generate_merkle_proof(leaves: Vec<String>, leaf: String, depth: usize) -> Result<Vec<u8>> {
    Ok(_generate_merkle_proof(leaves, leaf, depth)
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

    // Serialize the full merkle proof
    Ok(_generate_merkle_proof::<F>(leaves, leaf, depth)
        .map_err(|_e| JsValue::from_str(&_e.to_string()))?
        .to_bytes_le()
        .map_err(|_e| JsValue::from_str("Could not encode merkle proof"))?
        .serialize()
        .map_err(|_e| JsValue::from_str("Could not serialize merkle proof bytes"))?)
}

#[cfg(test)]
mod tests {
    use crate::binary_merkle_tree::MerkleProofBytes;
    use anyhow::Result;

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
        let leaves = vec!["0x1234".to_string(), "0x4567".to_string()];
        let result = generate_merkle_proof(leaves.clone(), "0x1234".to_string(), DEPTH);

        // TODO: the poseidon hasher output here is different from the output in Spartan version.
        // Which I think because of the different consts configured in Poseidon.
        match result {
            Ok(result) => {
                assert_eq!(
                    result,
                    vec![
                        96, 0, 0, 0, 0, 0, 0, 0, 69, 103, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 79, 176, 238, 128, 103, 7,
                        167, 17, 91, 25, 242, 76, 185, 161, 32, 94, 164, 97, 169, 75, 213, 208, 69,
                        215, 25, 161, 66, 176, 142, 235, 44, 43, 187, 9, 193, 87, 201, 79, 41, 42,
                        226, 213, 58, 41, 178, 33, 9, 227, 159, 255, 248, 48, 80, 254, 169, 150,
                        42, 108, 158, 41, 199, 228, 106, 39, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0,
                        189, 178, 11, 228, 184, 6, 122, 252, 158, 210, 26, 132, 156, 0, 159, 92,
                        94, 209, 68, 92, 204, 53, 67, 110, 95, 131, 83, 64, 92, 13, 147, 41
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
                        46, 25, 119, 243, 174, 114, 189, 54, 144, 52, 80, 137, 3, 193, 163, 30,
                        250, 65, 237, 7, 152, 117, 246, 23, 241, 253, 152, 215, 105, 18, 217, 37
                    ]
                )
            }
        }

        Ok(())
    }
}
