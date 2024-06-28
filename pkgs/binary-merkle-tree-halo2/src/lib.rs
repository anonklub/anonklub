use anyhow::{Context, Ok, Result};
use binary_merkle_tree::{BinaryMerkleTree, MerkleProofBytes};
use halo2_base::halo2_proofs::halo2curves::secp256k1;
use halo2_base::utils::BigPrimeField;
use num_bigint::BigUint;
use pse_poseidon::Poseidon;
use serde::Serialize;
use wasm_bindgen::JsValue;
use web_sys::js_sys::wasm_bindgen;

pub mod binary_merkle_tree;

type F = secp256k1::Fp;

fn _build_binary_merkle_tree<'a, F, const T: usize, const RATE: usize, const ARITY: usize>(
    leaves: Vec<String>,
    depth: usize,
    r_f: usize,
    r_p: usize,
) -> Result<BinaryMerkleTree<'a, F, T, RATE, ARITY>>
where
    F: BigPrimeField,
{
    let mut padded_leaves = leaves.clone();
    // Pad the leaves to equal the size of the tree
    // Needs to be an even string
    padded_leaves.resize(1 << depth, "00".to_string());

    let mut poseidon = Poseidon::<F, T, RATE>::new(r_f, r_p);
    let mut tree = BinaryMerkleTree::<F, T, RATE, ARITY>::new(&mut poseidon);

    for leaf in &padded_leaves {
        // Converting String to F
        let leaf_hex = hex::decode(leaf.replace("0x", ""))
            .with_context(|| format!("could not decode hex for leaf {}", leaf))?;

        let leaf_prime_field = F::from_bytes_le(BigUint::from_bytes_le(&leaf));
        tree.insert(leaf_prime_field);
    }

    tree.finish();
    Ok(tree)
}

fn _generate_merkle_proof<'a, F, const T: usize, const RATE: usize, const ARITY: usize>(
    leaves: Vec<String>,
    leaf: String,
    depth: usize,
    r_f: usize,
    r_p: usize,
) -> Result<MerkleProofBytes>
where
    F: BigPrimeField,
{
    let tree = _build_binary_merkle_tree::<F, T, RATE, ARITY>(leaves, depth, r_f, r_p)
        .context("failed constructing merkle tree")?;

    let leaf_hex = hex::decode(leaf.replace("0x", ""))
        .with_context(|| format!("could not decode hex for leaf {}", leaf))?;
    let leaf_prime_field = F::from(BigUint::from_bytes_le(&leaf_hex));

    let proof = tree
        .gen_proof(leaf_prime_field, leaf)
        .map_err(|e| anyhow::anyhow!(e))?;

    // Encode the Merkle Proof output with LittleEndian
    let mut merkle_siblings = Vec::with_capacity(depth);
    let mut merkle_indices = Vec::with_capacity(depth);

    let siblings_bytes = proof
        .siblings
        .iter()
        .flat_map(|sibling| sibling.to_bytes_le())
        .collect::<Vec<u8>>();

    let indices_bytes = proof
        .path_indices
        .iter()
        .flat_map(|path_index| path_index.to_bytes_le())
        .collect::<Vec<u8>>();

    merkle_siblings.extend_from_slice(&siblings_bytes);
    merkle_indices.extend_from_slice(&indices_bytes);

    let root_bytes = tree.root.to_bytes_le();

    Ok(MerkleProofBytes {
        siblings: siblings_bytes,
        path_indices: indices_bytes,
        root: root_bytes,
    })
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub fn generate_merkle_proof(
    leaves: Vec<String>,
    leaf: String,
    depth: usize,
    t: usize,
    rate: usize,
    arity: usize,
    r_f: usize,
    r_p: usize,
) -> std::result::Result<Vec<u8>, JsValue> {
    use halo2_base::halo2_proofs::halo2curves::secp256k1;

    std::panic::set_hook(Box::new(console_error_panic_hook::hook));

    let merkle_proof_bytes =
        _generate_merkle_proof::<F, t, rate, arity>(leaves, leaf, depth, r_f, r_p)
            .map_err(|_e| JsValue::from_str("Could not generate merkle proof"))?;

    // Serialize the full merkle proof
    let mut merkle_proof_bytes_serialized = merkle_proof_bytes
        .serialize()
        .map_err(|_e| JsValue::from_str("Could not serialize merkle proof bytes"))?;

    Ok(merkle_proof_bytes_serialized)
}

#[cfg(not(target_arch = "wasm32"))]
pub fn generate_merkle_proof(
    leaves: Vec<String>,
    leaf: String,
    depth: usize,
    t: usize,
    rate: usize,
    arity: usize,
    r_f: usize,
    r_p: usize,
) -> Result<Vec<u8>> {
    let merkle_proof_bytes =
        _generate_merkle_proof::<F, {t}, rate, arity>(leaves, leaf, depth, r_f, r_p)?;

    // Serialize the full merkle proof
    let mut merkle_proof_bytes_serialized = merkle_proof_bytes
        .serialize()
        .context("could not serizalize merkle proof bytes")?;

    Ok(merkle_proof_bytes_serialized)
}

#[cfg(not(target_arch = "wasm32"))]
pub fn generate_merkle_root(
    leaves: Vec<String>,
    depth: usize,
    t: usize,
    rate: usize,
    arity: usize,
    r_f: usize,
    r_p: usize,
) -> Result<Vec<u8>> {
    use halo2_base::utils::ScalarField;

    let tree = _build_binary_merkle_tree::<F, t, rate, arity>(leaves, depth, r_f, r_p)?;

    let root_bytes = tree.root.to_bytes_le();

    Ok(root_bytes)
}

// Macro to generate the function for given constants
macro_rules! generate_merkle_proof_fn {
    ($name:ident, $F:ty, $T:expr, $RATE:expr, $ARITY:expr) => {
        pub fn $name(
            leaves: Vec<String>,
            leaf: String,
            depth: usize,
            r_f: usize,
            r_p: usize,
        ) -> Result<Vec<u8>> {
            let merkle_proof_bytes =
                _generate_merkle_proof::<$F, $T, $RATE, $ARITY>(leaves, leaf, depth, r_f, r_p)?;
            Ok(serde_json::to_vec(&merkle_proof_bytes)?)
        }
    };
}

#[cfg(test)]
mod tests {
    use super::{generate_merkle_proof, generate_merkle_root};
    use crate::_build_binary_merkle_tree;
    use halo2_base::halo2_proofs::halo2curves::secp256k1;
    use pse_poseidon::Poseidon;

    type F = secp256k1::Fp; // Base FF;

    const DEPTH: usize = 3;

    /// Binary Merkle Tree
    const WIDTH: usize = 3;
    const ARITY: usize = WIDTH - 1;

    /// Poseidon
    /// `State` is structure `T` sized field elements that are subjected to
    /// permutation
    const T: usize = 3;
    const RATE: usize = 2;
    const R_F: usize = 8;
    const R_P: usize = 57;

    #[test]
    fn fail_to_build_merkle_tree_if_not_hex() {
        let leaves = vec!["wxyz".to_string(), "hjkl".to_string()];
        let result = _build_binary_merkle_tree::<F, T, RATE, ARITY>(leaves, DEPTH, R_F, R_P);

        match result {
            Ok(_) => panic!("Expected to fail"),
            Err(e) => assert_eq!(e.to_string(), "could not decode hex for leaf wxyz"),
        }
    }

    #[test]
    fn can_build_merkle_tree() {
        let leaves = vec!["0x1234".to_string(), "0x4567".to_string()];
        let result = _build_binary_merkle_tree::<F, T, RATE, ARITY>(leaves, DEPTH, R_F, R_P);

        match result {
            Ok(_) => (),
            Err(e) => panic!("Expected to succeed, got error: {}", e),
        }
    }

    #[test]
    fn fail_to_generate_merkle_proof() {
        let leaves = vec!["wxyz".to_string(), "hjkl".to_string()];

        let result =
            generate_merkle_proof(leaves, "wxyz".to_string(), DEPTH, T, RATE, ARITY, R_F, R_P);
        match result {
            Ok(_) => panic!("Expected to fail"),
            Err(e) => assert_eq!(e.to_string(), "failed constructing merkle tree"),
        }
    }

    #[test]
    fn can_generate_merkle_proof() {
        let leaves = vec!["0x1234".to_string(), "0x4567".to_string()];
        let result = generate_merkle_proof(
            leaves,
            "0x1234".to_string(),
            DEPTH,
            T,
            RATE,
            ARITY,
            R_F,
            R_P,
        );

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

        let root = generate_merkle_root(
            leaves.into_iter().map(|s| s.to_string()).collect(),
            DEPTH,
            T,
            RATE,
            ARITY,
            R_F,
            R_P,
        );
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
