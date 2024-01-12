#![allow(non_snake_case)]
mod merkle_tree;

extern crate console_error_panic_hook;

use ark_ff::{BigInteger, PrimeField};
use ark_serialize::CanonicalSerialize;
use num_bigint::BigUint;
use poseidon::constants::secp256k1_w3;
use wasm_bindgen::prelude::wasm_bindgen;

use crate::merkle_tree::{MerkleProofBytes, MerkleTree};

fn internal_generate_merkle_proof<F: PrimeField>(
    leaves: Vec<String>,
    leaf: String,
    depth: usize,
) -> MerkleProofBytes {
    let leaves = leaves.clone();

    let mut padded_leaves = leaves.clone();
    // Pad the leaves to equal the size of the tree
    padded_leaves.resize(1 << depth, "0".to_string());

    const ARITY: usize = 2;
    const WIDTH: usize = ARITY + 1;

    let mut tree = MerkleTree::<F, WIDTH>::new(secp256k1_w3());

    // Insert all the leaves into the tree
    for leaf in &padded_leaves {
        // Converting String to F
        let leaf_hex = hex::decode(leaf.replace("0x", "to")).unwrap();
        let leaf_bytes = F::from(BigUint::from_bytes_be(&leaf_hex));
        tree.insert(leaf_bytes);
    }

    tree.finish();

    let leaf_hex = hex::decode(leaf.replace("0x", "")).unwrap();
    let leaf_prime_field = F::from(BigUint::from_bytes_be(&leaf_hex));

    let proof = tree.create_proof(leaf_prime_field);

    // Encode the Merkle Proof output with BigEndian
    let mut merkle_siblings = Vec::with_capacity(1 * depth);
    let mut merkle_indices = Vec::with_capacity(1 * depth);
    let siblings_bytes = proof
        .siblings
        .iter()
        .flat_map(|sibling| sibling.into_bigint().to_bytes_be())
        .collect::<Vec<u8>>();

    let indicies_bytes = proof
        .path_indices
        .iter()
        .map(|i| F::from(*i as u32).into_bigint().to_bytes_be())
        .flatten()
        .collect::<Vec<u8>>();

    merkle_siblings.extend_from_slice(&siblings_bytes);
    merkle_indices.extend_from_slice(&indicies_bytes);

    let root_bytes = tree.root.unwrap().into_bigint().to_bytes_be();

    let proof = MerkleProofBytes {
        siblings: siblings_bytes,
        path_indices: indicies_bytes,
        root: root_bytes,
    };

    proof
}

#[wasm_bindgen]
pub fn generate_merkle_proof(leaves: Vec<String>, leaf: String, depth: usize) -> Vec<u8> {
    std::panic::set_hook(Box::new(console_error_panic_hook::hook));

    type F = ark_secp256k1::Fq;

    let merkle_proof_bytes = internal_generate_merkle_proof::<F>(leaves, leaf, depth);

    // Serialize the full merkle proof
    let mut merkle_proof_bytes_serialized = Vec::new();
    merkle_proof_bytes
        .serialize_compressed(&mut merkle_proof_bytes_serialized)
        .unwrap();

    merkle_proof_bytes_serialized
}
