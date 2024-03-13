#![allow(non_snake_case)]
mod merkle_tree_wasm;

extern crate console_error_panic_hook;

use anonklub_poseidon::constants::secp256k1_w3;
use ark_ff::{BigInteger, PrimeField};
use ark_serialize::CanonicalSerialize;
use num_bigint::BigUint;
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

pub use merkle_tree_wasm::{MerkleProofBytes, MerkleTree};

fn _build_merkle_tree<F: PrimeField>(
    leaves: Vec<String>,
    depth: usize,
) -> Result<MerkleTree<F, 3>, String> {
    let mut padded_leaves = leaves.clone();
    // Pad the leaves to equal the size of the tree
    // Needs to be an even string
    padded_leaves.resize(1 << depth, "00".to_string());

    const ARITY: usize = 2;
    const WIDTH: usize = ARITY + 1;

    let mut tree = MerkleTree::<F, WIDTH>::new(secp256k1_w3());

    // Insert all the leaves into the tree
    for leaf in &padded_leaves {
        // Converting String to F
        let leaf_hex = hex::decode(leaf.replace("0x", ""))
            .map_err(|e| format!("MerkleTree: Error decoding hex: {}", e))?;
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
) -> Result<MerkleProofBytes, String> {
    let tree = _build_merkle_tree::<F>(leaves, depth)?;

    let leaf_hex = hex::decode(leaf.replace("0x", ""))
        .map_err(|e| format!("MerkleTree: Error decoding hex: {}", e))?;
    let leaf_prime_field = F::from(BigUint::from_bytes_be(&leaf_hex));

    let proof = tree.create_proof(leaf_prime_field)?;

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
        .ok_or("MerkleTree: Root is not available")?
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
) -> Result<Vec<u8>, JsValue> {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));

    type F = ark_secp256k1::Fq;

    let merkle_proof_bytes =
        _generate_merkle_proof::<F>(leaves, leaf, depth).map_err(|e| JsValue::from_str(&e))?;

    // Serialize the full merkle proof
    let mut merkle_proof_bytes_serialized = Vec::new();
    merkle_proof_bytes
        .serialize_compressed(&mut merkle_proof_bytes_serialized)
        .map_err(|_e| JsValue::from_str("Error serializing Merkle proof bytes"))?;

    Ok(merkle_proof_bytes_serialized)
}

#[cfg(not(target_arch = "wasm32"))]
pub fn generate_merkle_proof(
    leaves: Vec<String>,
    leaf: String,
    depth: usize,
) -> Result<Vec<u8>, String> {
    type F = ark_secp256k1::Fq;

    let merkle_proof_bytes = _generate_merkle_proof::<F>(leaves, leaf, depth)?;

    // Serialize the full merkle proof
    let mut merkle_proof_bytes_serialized = Vec::new();
    merkle_proof_bytes
        .serialize_compressed(&mut merkle_proof_bytes_serialized)
        .map_err(|e| format!("Error serializing Merkle proof bytes: {}", e))?;

    Ok(merkle_proof_bytes_serialized)
}

// TODO: use Option for depth, default to 15
#[cfg(not(target_arch = "wasm32"))]
pub fn generate_merkle_root(leaves: Vec<String>, depth: usize) -> Result<Vec<u8>, String> {
    type F = ark_secp256k1::Fq;

    let tree = _build_merkle_tree::<F>(leaves, depth)?;

    let root_bytes = tree
        .root
        .ok_or("MerkleTree: Root is not available")?
        .into_bigint()
        .to_bytes_be();

    Ok(root_bytes)
}

// TODO:tests
