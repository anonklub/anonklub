#![allow(non_snake_case)]
mod merkle_tree_wasm;

extern crate console_error_panic_hook;

use anonklub_poseidon::constants::secp256k1_w3;
use anyhow::{Context, Result};
use ark_ff::{BigInteger, PrimeField};
use ark_serialize::CanonicalSerialize;
use num_bigint::BigUint;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

pub use merkle_tree_wasm::{MerkleProofBytes, MerkleTree};

fn _build_merkle_tree<F: PrimeField>(leaves: Vec<String>, depth: usize) -> Result<MerkleTree<F>> {
    let mut padded_leaves = leaves.clone();
    // Pad the leaves to equal the size of the tree
    // Needs to be an even string
    padded_leaves.resize(1 << depth, "00".to_string());

    let mut tree = MerkleTree::<F>::new(secp256k1_w3());

    // Insert all the leaves into the tree
    for leaf in &padded_leaves {
        // Converting String to F
        let leaf_hex = hex::decode(leaf.replace("0x", ""))
            .with_context(|| format!("could not decode hex for leaf {}", leaf))?;
        let leaf_bytes = F::from(BigUint::from_bytes_be(&leaf_hex));
        tree.insert(leaf_bytes);
    }

    tree.finish();
    Ok(tree)
}

fn _generate_merkle_proof<F: PrimeField>(
    leaves: Vec<String>,
    leaf: String,
    depth: usize,
) -> Result<MerkleProofBytes> {
    let tree = _build_merkle_tree::<F>(leaves, depth).context("failed constructing merkle tree")?;

    let leaf_hex = hex::decode(leaf.replace("0x", ""))
        .with_context(|| format!("could not decode hex for leaf {}", leaf))?;
    let leaf_prime_field = F::from(BigUint::from_bytes_be(&leaf_hex));

    let proof = tree
        .create_proof(leaf_prime_field, leaf)
        .map_err(|e| anyhow::anyhow!(e))?;

    // Encode the Merkle Proof output with BigEndian
    let mut merkle_siblings = Vec::with_capacity(depth);
    let mut merkle_indices = Vec::with_capacity(depth);
    let siblings_bytes = proof
        .siblings
        .iter()
        .flat_map(|sibling| sibling.into_bigint().to_bytes_be())
        .collect::<Vec<u8>>();

    let indices_bytes = proof
        .path_indices
        .iter()
        .flat_map(|i| F::from(*i as u32).into_bigint().to_bytes_be())
        .collect::<Vec<u8>>();

    merkle_siblings.extend_from_slice(&siblings_bytes);
    merkle_indices.extend_from_slice(&indices_bytes);

    let root_bytes = tree
        .root
        .context("merkle tree toot is not available")?
        .into_bigint()
        .to_bytes_be();

    Ok(MerkleProofBytes {
        siblings: siblings_bytes,
        path_indices: indices_bytes,
        root: root_bytes,
    })
}

// TODO: use depth as Option, default to 15?
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn generate_merkle_proof(
    leaves: Vec<String>,
    leaf: String,
    depth: usize,
) -> std::result::Result<Vec<u8>, JsValue> {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));

    type F = ark_secp256k1::Fq;

    let merkle_proof_bytes = _generate_merkle_proof::<F>(leaves, leaf, depth)
        .map_err(|_e| JsValue::from_str("Could not generate merkle proof"))?;

    // Serialize the full merkle proof
    let mut merkle_proof_bytes_serialized = Vec::new();
    merkle_proof_bytes
        .serialize_compressed(&mut merkle_proof_bytes_serialized)
        .map_err(|_e| JsValue::from_str("Could not serialize merkle proof bytes"))?;

    Ok(merkle_proof_bytes_serialized)
}

#[cfg(not(target_arch = "wasm32"))]
pub fn generate_merkle_proof(leaves: Vec<String>, leaf: String, depth: usize) -> Result<Vec<u8>> {
    type F = ark_secp256k1::Fq;

    let merkle_proof_bytes = _generate_merkle_proof::<F>(leaves, leaf, depth)?;

    // Serialize the full merkle proof
    let mut merkle_proof_bytes_serialized = Vec::new();
    merkle_proof_bytes
        .serialize_compressed(&mut merkle_proof_bytes_serialized)
        .context("could not serizalize merkle proof bytes")?;

    Ok(merkle_proof_bytes_serialized)
}

// TODO: use Option for depth, default to 15
#[cfg(not(target_arch = "wasm32"))]
pub fn generate_merkle_root(leaves: Vec<String>, depth: usize) -> Result<Vec<u8>> {
    type F = ark_secp256k1::Fq;

    let tree = _build_merkle_tree::<F>(leaves, depth)?;

    let root_bytes = tree
        .root
        .context("merkle tree root is not available")?
        .into_bigint()
        .to_bytes_be();

    Ok(root_bytes)
}

// TODO:tests

#[cfg(test)]
mod tests {
    use super::{_build_merkle_tree, generate_merkle_proof, generate_merkle_root};

    const DEPTH: usize = 3;

    #[test]
    fn fail_to_build_merkle_tree_if_not_hex() {
        let leaves = vec!["wxyz".to_string(), "hjkl".to_string()];
        let result = _build_merkle_tree::<ark_secp256k1::Fq>(leaves, DEPTH);

        match result {
            Ok(_) => panic!("Expected to fail"),
            Err(e) => assert_eq!(e.to_string(), "could not decode hex for leaf wxyz"),
        }
    }

    #[test]
    fn can_build_merkle_tree() {
        let leaves = vec!["0x1234".to_string(), "0x4567".to_string()];
        let result = _build_merkle_tree::<ark_secp256k1::Fq>(leaves, DEPTH);

        match result {
            Ok(_) => (),
            Err(e) => panic!("Expected to succeed, got error: {}", e),
        }
    }

    #[test]
    fn fail_to_generate_merkle_proof() {
        let leaves = vec!["wxyz".to_string(), "hjkl".to_string()];

        let result = generate_merkle_proof(leaves, "wxyz".to_string(), DEPTH);
        match result {
            Ok(_) => panic!("Expected to fail"),
            Err(e) => assert_eq!(e.to_string(), "failed constructing merkle tree"),
        }
    }

    #[test]
    fn can_generate_merkle_proof() {
        let leaves = vec!["0x1234".to_string(), "0x4567".to_string()];
        let result = generate_merkle_proof(leaves, "0x1234".to_string(), DEPTH);

        match result {
            Ok(proof) => {
                assert_eq!(
                    proof,
                    vec![
                        96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 103, 42, 106, 236, 60, 219, 199,
                        235, 47, 135, 38, 26, 208, 190, 66, 208, 203, 135, 208, 196, 87, 254, 186,
                        148, 33, 217, 75, 104, 3, 123, 23, 204, 101, 41, 235, 49, 168, 222, 206,
                        42, 58, 150, 51, 228, 157, 242, 239, 56, 200, 101, 56, 118, 187, 234, 142,
                        239, 123, 197, 145, 11, 15, 44, 118, 30, 140, 96, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0,
                        0, 0, 0, 156, 244, 160, 240, 109, 126, 49, 99, 81, 33, 252, 212, 65, 211,
                        134, 142, 44, 122, 99, 89, 149, 249, 42, 186, 112, 171, 241, 222, 20, 140,
                        116, 253
                    ]
                )
            }
            Err(e) => panic!("Expected to succeed, got error: {}", e),
        }
    }

    #[test]
    fn can_generate_merkle_root() {
        let leaves = vec!["0x12", "0xfe", "0x4912de"];

        let root = generate_merkle_root(leaves.into_iter().map(|s| s.to_string()).collect(), DEPTH);
        match root {
            Err(e) => panic!("Expected to succeed, got error {}", e),
            Ok(root) => {
                assert_eq!(
                    root,
                    vec![
                        230, 148, 99, 147, 85, 193, 189, 219, 123, 0, 199, 176, 218, 104, 130, 149,
                        80, 94, 7, 55, 219, 145, 110, 56, 51, 240, 141, 3, 99, 182, 22, 218
                    ]
                )
            }
        }
    }
}
