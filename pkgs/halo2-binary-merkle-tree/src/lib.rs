use anyhow::{Context, Ok, Result};
use binary_merkle_tree::{BinaryMerkleTree, MerkleProof};
use consts::{ARITY, RATE, R_F, R_P, T};
use halo2_base::halo2_proofs::halo2curves::secp256k1;
use halo2_base::utils::{BigPrimeField, ScalarField};
use halo2_wasm_ext::consts::F;
use pse_poseidon::Poseidon;
/// Adding this exception because wasm_bindgen
/// is being used in generate_merkle_proof that has
/// #[cfg(target_arch = "wasm32")] flag which is not
/// readable by `cargo clippy` so we get unused import warn
#[allow(unused_imports)]
use wasm_bindgen::prelude::wasm_bindgen;

pub mod binary_merkle_tree;
pub(crate) mod consts;
pub mod gadget;

fn _generate_merkle_proof(leaves: Vec<String>, leaf: String, depth: usize) -> Result<MerkleProof> {
    let mut padded_leaves = leaves.clone();
    // Pad the leaves to equal the size of the tree
    // Needs to be an even string
    padded_leaves.resize(1 << depth, "00".to_string());

    let mut poseidon = Poseidon::<F, T, RATE>::new(R_F, R_P);
    let mut binary_merkle_tree = BinaryMerkleTree::<T, RATE, ARITY>::new(&mut poseidon);

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
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 113, 215, 212, 126, 63,
                        163, 171, 86, 101, 66, 126, 1, 200, 183, 168, 139, 51, 223, 120, 168, 10,
                        181, 196, 244, 236, 139, 147, 59, 31, 194, 17, 10, 241, 107, 128, 125, 125,
                        161, 248, 70, 27, 204, 2, 168, 121, 166, 246, 191, 232, 50, 144, 69, 206,
                        147, 158, 45, 244, 28, 107, 107, 136, 15, 99, 28, 96, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0,
                        0, 0, 0, 0, 0, 124, 108, 254, 20, 241, 196, 186, 100, 171, 92, 4, 42, 174,
                        170, 94, 26, 215, 48, 223, 246, 212, 221, 230, 249, 58, 206, 250, 175, 114,
                        50, 110
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
                        220, 141, 62, 135, 32, 72, 185, 14, 130, 248, 251, 54, 188, 235, 60, 22,
                        64, 172, 91, 68, 163, 83, 130, 190, 53, 168, 235, 0, 21, 235, 98, 221
                    ]
                )
            }
        }

        Ok(())
    }
}
