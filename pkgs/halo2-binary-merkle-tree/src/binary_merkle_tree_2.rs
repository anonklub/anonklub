use halo2_base::utils::BigPrimeField;
use pse_poseidon::Poseidon;

/// @src https://github.com/aerius-labs/zksnap-circuits-halo2/blob/ffa3f7e3c1102deb78520015c02342fda5e0c630/voter_tests/src/lib.rs
#[derive(Debug)]
pub struct BinaryMerkleTree2<'a, F: BigPrimeField, const T: usize, const RATE: usize> {
    hash: &'a mut Poseidon<F, T, RATE>,
    tree: Vec<Vec<F>>,
    root: F,
}

impl<'a, F: BigPrimeField, const T: usize, const RATE: usize> BinaryMerkleTree2<'a, F, T, RATE> {
    pub fn new(
        hash: &'a mut Poseidon<F, T, RATE>,
        leaves: Vec<F>,
    ) -> Result<BinaryMerkleTree2<'a, F, T, RATE>, &'static str> {
        if leaves.is_empty() {
            return Err("Cannot create Merkle Tree with no leaves");
        }
        if leaves.len() == 1 {
            return Ok(BinaryMerkleTree2 {
                hash,
                tree: vec![leaves.clone()],
                root: leaves[0],
            });
        }
        if leaves.len() % 2 == 1 {
            return Err("Leaves must be even");
        }

        let mut tree = vec![leaves.clone()];
        let mut current_level = leaves.clone();

        while current_level.len() > 1 {
            let mut next_level = Vec::new();
            for i in (0..current_level.len()).step_by(2) {
                let left = current_level[i];
                let right = current_level[i + 1];
                hash.update(&[left, right]);
                next_level.push(hash.squeeze_and_reset());
            }
            tree.push(next_level.clone());
            current_level = next_level.clone();
        }
        Ok(BinaryMerkleTree2 {
            hash,
            tree,
            root: current_level[0],
        })
    }

    pub fn get_root(&self) -> F {
        self.root
    }

    pub fn get_proof(&self, index: usize) -> (Vec<F>, Vec<F>) {
        let mut proof = Vec::new();
        let mut proof_helper = Vec::new();
        let mut current_index = index;

        for i in 0..self.tree.len() - 1 {
            let level = &self.tree[i];
            let is_left_node = current_index % 2 == 0;
            let sibling_index = if is_left_node {
                current_index + 1
            } else {
                current_index - 1
            };
            let sibling = level[sibling_index];

            proof.push(sibling);
            proof_helper.push(if is_left_node { F::from(1) } else { F::from(0) });

            current_index /= 2;
        }

        (proof, proof_helper)
    }

    pub fn verify_proof(&mut self, leaf: &F, index: usize, root: &F, proof: &[F]) -> bool {
        let mut computed_hash = *leaf;
        let mut current_index = index;

        for ele in proof {
            let proof_element = ele;
            let is_left_node = current_index % 2 == 0;

            computed_hash = if is_left_node {
                self.hash.update(&[computed_hash, *proof_element]);
                self.hash.squeeze_and_reset()
            } else {
                self.hash.update(&[*proof_element, computed_hash]);
                self.hash.squeeze_and_reset()
            };

            current_index /= 2;
        }

        computed_hash == *root
    }

    pub fn get_leaf_proof(self, leaf: &F) -> (Vec<F>, Vec<F>) {
        for node in self.tree[0].clone() {
            if node == *leaf {
                let index = self.tree[0].iter().position(|x| x == leaf).unwrap();
                return self.get_proof(index);
            }
        }
        panic!("Leaf not found");
    }

    pub fn get_tree(&self) -> Vec<Vec<F>> {
        self.tree.clone()
    }
}
