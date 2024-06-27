use crate::consts::{ARITY, F, RATE, T};
use anyhow::{Context, Ok, Result};
use halo2_base::{poseidon, utils::BigPrimeField};
use halo2_wasm::halo2lib::R_F;
use pse_poseidon::Poseidon;
use rayon::{
    iter::{IntoParallelRefIterator, ParallelIterator},
    slice::ParallelSlice,
};
use serde::{de, Deserialize, Serialize};

pub struct BinaryMerkleTree {
    pub root: F,
    leaves: Vec<F>,
    poseidon: Poseidon<F, T, RATE>,
    is_tree_ready: bool,
    layers: Vec<Vec<F>>,
    depth: usize,
}

#[derive(Serialize, Deserialize)]
pub struct MerkleProofBytes {
    siblings: Vec<u8>,
    path_indices: Vec<u8>,
    root: Vec<u8>,
}

pub struct MerkleProof {
    leaf: F,
    siblings: Vec<F>,
    path_indices: Vec<usize>,
    root: F,
}

// TODO: maybe adding PoseidonConstants in the PSE version
impl BinaryMerkleTree {
    pub fn new(r_f: usize, r_p: usize) -> Self {
        let mut poseidon = Poseidon::<F, T, RATE>::new(r_f, r_p);
        poseidon.update(&[F::from(3u64)]);

        Self {
            root: F::zero(),
            leaves: vec![],
            poseidon,
            is_tree_ready: false,
            layers: vec![],
            depth: 0,
        }
    }

    /// Add the leaf to the bottom-most layer
    pub fn insert(&mut self, leaf: F) {
        self.leaves.push(leaf);
    }

    fn hash(poseidon: &mut Poseidon<F, T, RATE>, nodes: &[F]) -> F {
        poseidon.update(nodes);

        let out = poseidon.squeeze_and_reset();

        out
    }

    pub fn finish(&mut self) {
        let padding_len = self.leaves.len().next_power_of_two();
        self.leaves.resize(padding_len, F::zero());

        let depth = (padding_len as f64).log2() as usize;

        self.depth = depth;

        self.is_tree_ready = true;

        // Calculate the root
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
            path_indices.push(leaf_index & 1);

            leaf_index /= 2;
            current_layer = &self.layers[i + 1];
        }

        Ok(MerkleProof {
            leaf,
            siblings,
            path_indices,
            root: self.root,
        })
    }

    pub fn verify_proof(&mut self, root: F, proof: &MerkleProof) -> bool {
        let mut node = proof.leaf;
        for (sibling, node_index) in proof.siblings.iter().zip(proof.path_indices.iter()) {
            let is_node_index_even = node_index & 1 == 0;

            let nodes = if is_node_index_even {
                [node, *sibling]
            } else {
                [*sibling, node]
            };

            node = Self::hash(&mut self.poseidon, &nodes);
        }

        node == root
    }
}

#[cfg(test)]
mod tests {
    use ark_std::{end_timer, start_timer};

    use crate::consts::{F, R_F, R_P};

    use super::BinaryMerkleTree;

    #[test]
    fn test_tree() {
        let mut tree = BinaryMerkleTree::new(R_F, R_P);

        let depth = 10;
        let num_leaves = 1 << depth;
        let leaves = (0..num_leaves)
            .map(|i| F::from(i as u64))
            .collect::<Vec<F>>();

        // Insert leaves
        let insert_leaves_timer = start_timer!(|| "Insert leaves");
        for leaf in leaves.iter() {
            tree.insert(*leaf);
        }
        end_timer!(insert_leaves_timer);

        tree.finish();

        let proof = tree
            .gen_proof(leaves[0], (&"Test address").to_string())
            .unwrap();

        assert!(tree.verify_proof(tree.root, &proof));
    }
}
