use ark_ff::PrimeField;
use sapir::{
    constraint_system::{ConstraintSystem, Wire},
    frontend::gadgets::{
        ec_add_complete, ec_mul, poseidon::poseidon::PoseidonChip, to_addr, to_le_bits,
        verify_merkle_proof, AffinePoint,
    },
    poseidon::constants::secp256k1_w3,
};

pub const TREE_DEPTH: usize = 15;
pub const NUM_MERKLE_PROOFS: usize = 1;

pub struct AssignedMerkleProof<F: PrimeField> {
    pub siblings: Vec<Wire<F>>,
    pub indices: Vec<Wire<F>>,
}

impl<F: PrimeField> AssignedMerkleProof<F> {
    pub fn new(siblings: Vec<Wire<F>>, indices: Vec<Wire<F>>) -> Self {
        Self { siblings, indices }
    }
}

pub fn eth_membership<F: PrimeField>(cs: &mut ConstraintSystem<F>) {
    // #############################################
    // Private inputs
    // #############################################

    // `s` part of the signature
    let s_bits = cs.alloc_priv_inputs(256);

    let mut merkle_proofs = Vec::with_capacity(NUM_MERKLE_PROOFS);

    for _ in 0..NUM_MERKLE_PROOFS {
        let merkle_indices = cs.alloc_priv_inputs(TREE_DEPTH);
        let merkle_siblings = cs.alloc_priv_inputs(TREE_DEPTH);

        merkle_proofs.push(AssignedMerkleProof::new(merkle_siblings, merkle_indices));
    }

    // #############################################
    // Public inputs
    // #############################################

    let t_x = cs.alloc_pub_input();
    let t_y = cs.alloc_pub_input();

    let u_x = cs.alloc_pub_input();
    let u_y = cs.alloc_pub_input();

    // #############################################
    // Constraints
    // #############################################

    // 1. Recover the public key from the signature
    // s_mul_t = s * T
    let t = AffinePoint::new(t_x, t_y);
    let s_mul_t = ec_mul(t, &s_bits, cs);

    // pubKey = sMultT + U
    let u = AffinePoint::new(u_x, u_y);
    let pub_key = ec_add_complete(s_mul_t, u, cs);

    let pub_key_x_bits = to_le_bits(pub_key.x);
    let pub_key_y_bits = to_le_bits(pub_key.y);

    // We need this transformation because the bits should be in little endian
    // and the bytes should be in big endian.
    let pub_key_x_bits_be = pub_key_x_bits
        .chunks(8)
        .map(|byte| byte.to_vec())
        .rev()
        .flat_map(|x| x)
        .collect::<Vec<Wire<F>>>();

    let pub_key_y_bits_be = pub_key_y_bits
        .chunks(8)
        .map(|byte| byte.to_vec())
        .rev()
        .flat_map(|x| x)
        .collect::<Vec<Wire<F>>>();

    let pub_key_bits = [pub_key_x_bits_be, pub_key_y_bits_be].concat();

    // Get the Ethereum address from the public key
    let address = to_addr(pub_key_bits.try_into().unwrap());

    let poseidon_chip = PoseidonChip::new(cs, secp256k1_w3());

    // Verify the Merkle proofs
    for merkle_proof in merkle_proofs {
        let root = verify_merkle_proof(
            address,
            &merkle_proof.siblings,
            &merkle_proof.indices,
            poseidon_chip.clone(),
            cs,
        );

        cs.expose_public(root);
    }
}

pub fn to_cs_field(x: ark_secp256k1::Fq) -> ark_secq256k1::Fr {
    ark_secq256k1::Fr::from(x.into_bigint())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::utils::test_utils::mock_eff_ecdsa_input;
    use ark_ec::AffineRepr;
    use ark_ff::BigInteger;
    use num_bigint::BigUint;
    use sapir::merkle_tree::{MerkleProof, MerkleTree};

    type F = ark_secq256k1::Fr;

    #[test]
    fn test_eth_membership() {
        let synthesizer = |cs: &mut ConstraintSystem<_>| {
            eth_membership(cs);
        };

        let mut cs = ConstraintSystem::<_>::new();
        cs.set_constraints(&synthesizer);

        let eff_ecdsa_input = mock_eff_ecdsa_input(42);
        let address = F::from(BigUint::from_bytes_be(
            &eff_ecdsa_input.address.to_fixed_bytes(),
        ));

        // Construct a mock tree
        let mut leaves = vec![address];
        for i in 0..(2usize.pow(TREE_DEPTH as u32) - 1) {
            leaves.push(F::from(i as u32));
        }

        let mut tree = MerkleTree::<F, 3>::new(secp256k1_w3());
        for leaf in &leaves {
            tree.insert(*leaf);
        }

        tree.finish();

        let merkle_proof: MerkleProof<F> = tree.create_proof(address);

        let mut priv_input = vec![];

        let s_bits = eff_ecdsa_input
            .s
            .into_bigint()
            .to_bits_le()
            .iter()
            .map(|b| F::from(*b))
            .collect::<Vec<F>>();

        let merkle_indices = merkle_proof
            .path_indices
            .iter()
            .map(|i| F::from(*i as u32))
            .collect::<Vec<F>>();

        priv_input.extend_from_slice(&s_bits);

        // Just pass duplicate indices and siblings
        for _ in 0..NUM_MERKLE_PROOFS {
            priv_input.extend_from_slice(&merkle_indices);
            priv_input.extend_from_slice(&merkle_proof.siblings);
        }

        let mut pub_input = vec![
            to_cs_field(*eff_ecdsa_input.t.x().unwrap()),
            to_cs_field(*eff_ecdsa_input.t.y().unwrap()),
            to_cs_field(*eff_ecdsa_input.u.x().unwrap()),
            to_cs_field(*eff_ecdsa_input.u.y().unwrap()),
        ];

        for _ in 0..NUM_MERKLE_PROOFS {
            pub_input.push(to_cs_field(merkle_proof.root));
        }

        let witness: Vec<F> = cs.gen_witness(&synthesizer, &pub_input, &priv_input);

        assert!(cs.is_sat(&witness, &pub_input));
    }
}
