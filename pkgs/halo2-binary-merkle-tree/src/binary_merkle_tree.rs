#![warn(dead_code)]
use anyhow::{Context, Ok, Result};
use halo2_base::utils::ScalarField;
use halo2_wasm_ext::consts::F;
use pse_poseidon::Poseidon;
use rayon::{iter::ParallelIterator, slice::ParallelSlice};
use serde::{Deserialize, Serialize};

use crate::consts::ARITY;

pub struct BinaryMerkleTree<'a, const T: usize, const RATE: usize> {
    pub root: F,
    leaves: Vec<F>,
    poseidon: &'a mut Poseidon<F, T, RATE>,
    is_tree_ready: bool,
    layers: Vec<Vec<F>>,
    depth: usize,
}

#[derive(Serialize, Deserialize)]
pub struct MerkleProofBytes {
    pub depth: u8,
    pub leaf: Vec<u8>,
    pub siblings: Vec<u8>,
    pub path_indices: Vec<u8>,
    pub root: Vec<u8>,
}

impl MerkleProofBytes {
    pub fn serialize(&self) -> Result<Vec<u8>> {
        bincode::serialize(self).context("Failed to serialize MembershipProof")
    }

    pub fn deserialize(serialized: &[u8]) -> Result<Self> {
        bincode::deserialize(serialized).context("Failed to deserialize MembershipProof")
    }
}

#[derive(Debug)]
pub struct MerkleProof {
    pub depth: usize,
    pub leaf: F,
    pub siblings: Vec<F>,
    pub path_indices: Vec<F>,
    pub root: F,
}

impl MerkleProof {
    pub fn to_bytes_le(&self) -> Result<MerkleProofBytes> {
        Ok(MerkleProofBytes {
            depth: self.depth as u8,
            leaf: self.leaf.to_bytes_le(),
            siblings: self
                .siblings
                .iter()
                .flat_map(|sibling| sibling.to_bytes_le())
                .collect::<Vec<u8>>(),
            path_indices: self
                .path_indices
                .iter()
                .flat_map(|path_index| path_index.to_bytes_le())
                .collect::<Vec<u8>>(),
            root: self.root.to_bytes_le(),
        })
    }

    pub fn from_bytes_le(merkle_proof_bytes: &MerkleProofBytes) -> Result<Self> {
        let field_element_size = 32; // 256 bits / 8 bits per byte = 32 bytes

        // Helper function to convert 32-byte array to F
        fn bytes_to_field_element(bytes: &[u8]) -> Result<F> {
            let mut array = [0u8; 32];
            array.copy_from_slice(bytes);
            Ok(F::from_bytes_le(&array))
        }

        let leaf = bytes_to_field_element(&merkle_proof_bytes.leaf)
            .context("Failed to deserialize leaf")?;

        let siblings = merkle_proof_bytes
            .siblings
            .chunks(field_element_size)
            .map(bytes_to_field_element)
            .collect::<Result<Vec<F>, _>>()
            .context("Failed to deserialize siblings")?;

        let path_indices = merkle_proof_bytes
            .path_indices
            .chunks(field_element_size)
            .map(bytes_to_field_element)
            .collect::<Result<Vec<F>, _>>()
            .context("Failed to deserialize path_indices")?;

        let root = bytes_to_field_element(&merkle_proof_bytes.root)
            .context("Failed to deserialize root")?;

        Ok(MerkleProof {
            depth: merkle_proof_bytes.depth as usize,
            leaf,
            siblings,
            path_indices,
            root,
        })
    }
}

// TODO: maybe adding PoseidonConstants in the PSE version
impl<'a, const T: usize, const RATE: usize> BinaryMerkleTree<'a, T, RATE> {
    pub fn new(poseidon: &'a mut Poseidon<F, T, RATE>) -> Self {
        Self {
            root: F::zero(),
            leaves: Vec::new(),
            poseidon,
            is_tree_ready: false,
            layers: Vec::new(),
            depth: 0,
        }
    }

    /// Add the leaf to the bottom-most layer
    pub fn insert(&mut self, leaf: F) {
        self.leaves.push(leaf);
    }

    fn hash(poseidon: &mut Poseidon<F, T, RATE>, nodes: &[F]) -> F {
        poseidon.update(nodes);

        poseidon.squeeze_and_reset()
    }

    pub fn finish(&mut self) {
        let padding_len = self.leaves.len().next_power_of_two();
        self.leaves.resize(padding_len, F::zero());

        let depth = (padding_len as f64).log2() as usize;

        self.depth = depth;

        self.is_tree_ready = true;

        // Calculate the root
        let root = self.gen_root();
        self.root = root;
    }

    pub fn gen_root(&mut self) -> F {
        if !self.is_tree_ready {
            panic!("MerkleTree: Tree is not ready.");
        }

        self.layers.push(self.leaves.clone());
        let mut current_layer = self.layers[0].clone();

        (0..self.depth).for_each(|_| {
            let layer_above = current_layer
                .par_chunks(ARITY)
                .map(|nodes| {
                    let mut poseidon = self.poseidon.clone();
                    Self::hash(&mut poseidon, nodes)
                })
                .collect::<Vec<F>>();

            self.layers.push(layer_above.clone());
            current_layer = layer_above
        });

        assert_eq!(current_layer.len(), 1);

        current_layer[0]
    }

    pub fn gen_proof(&self, leaf: F, address: String) -> Result<MerkleProof> {
        if !self.is_tree_ready {
            panic!("MerkleTree: Tree is not ready.");
        }

        let mut siblings = vec![];
        let mut path_indices = vec![];

        let mut current_layer = &self.layers[0];

        let mut leaf_index = self
            .leaves
            .iter()
            .position(|&x| x == leaf)
            .with_context(|| {
                format!(
                    "Merkle proof: Leaf not found. Address {} is not part of the addresses set.",
                    address
                )
            })?;

        for i in 0..self.depth {
            let sibling_index = if leaf_index % 2 == 0 {
                leaf_index + 1
            } else {
                leaf_index - 1
            };

            let sibling = current_layer[sibling_index];
            siblings.push(sibling);

            let path_index = if leaf_index & 1 == 1 {
                F::from(1)
            } else {
                F::from(0)
            };
            path_indices.push(path_index);

            leaf_index /= 2;
            current_layer = &self.layers[i + 1];
        }

        Ok(MerkleProof {
            leaf,
            siblings,
            path_indices,
            depth: self.depth,
            root: self.root,
        })
    }

    pub fn verify_proof(&mut self, root: F, proof: &MerkleProof) -> bool {
        let mut computed_root = proof.leaf;
        for (sibling, node_index) in proof.siblings.iter().zip(proof.path_indices.iter()) {
            let is_node_index_even = *node_index == F::from(0);

            let nodes = if is_node_index_even {
                [computed_root, *sibling]
            } else {
                [*sibling, computed_root]
            };

            computed_root = Self::hash(self.poseidon, &nodes);
        }

        computed_root == root
    }
}

#[cfg(test)]
mod tests {
    use crate::consts::{RATE, R_F, R_P, T};

    use super::BinaryMerkleTree;
    use halo2_wasm_ext::consts::F;
    use pse_poseidon::Poseidon;

    #[test]
    fn test_tree() {
        let mut poseidon = Poseidon::<F, T, RATE>::new(R_F, R_P);
        let mut tree = BinaryMerkleTree::<T, RATE>::new(&mut poseidon);

        let depth = 10;
        let num_leaves = 1 << depth;
        let leaves = (0..num_leaves)
            .map(|i| F::from(i as u64))
            .collect::<Vec<F>>();

        // Insert leaves
        for leaf in leaves.iter() {
            tree.insert(*leaf);
        }

        tree.finish();

        let proof = tree
            .gen_proof(leaves[0], (&"Test address").to_string())
            .unwrap();

        assert!(tree.verify_proof(tree.root, &proof));
    }

    #[test]
    fn fail_to_build_proof_if_leaf_not_present() {
        let mut poseidon = Poseidon::<F, T, RATE>::new(R_F, R_P);
        let mut tree = BinaryMerkleTree::<T, RATE>::new(&mut poseidon);

        let depth = 10;
        let num_leaves = 1 << depth;
        let leaves = (0..num_leaves)
            .map(|i| F::from(i as u64))
            .collect::<Vec<F>>();

        // Insert leaves
        for leaf in leaves.iter() {
            tree.insert(*leaf);
        }

        tree.finish();

        let leaf = F::from(num_leaves + 1);
        let proof = tree.gen_proof(leaf, (&"Test address").to_string());

        match proof {
            Err(e) => assert!(e.to_string().contains("not part of the addresses set")),
            _ => panic!("expected error"),
        }
    }
}
