use ark_ff::PrimeField;
use sapir::{
    constraint_system::{ConstraintSystem, Wire},
    frontend::gadgets::{
        ec_add_complete, ec_mul, poseidon::poseidon::PoseidonChip, to_addr, to_le_bits,
        verify_merkle_proof, AffinePoint,
    },
    merkle_tree::MerkleProof,
    poseidon::constants::secp256k1_w3,
};

pub const TREE_DEPTH: usize = 15;
pub const NUM_MERKLE_PROOFS: usize = 4;

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

    let mut merkle_proofs = Vec::with_capacity(TREE_DEPTH);

    for _ in 0..NUM_MERKLE_PROOFS {
        let merkle_indices = cs.alloc_pub_inputs(TREE_DEPTH);
        let merkle_siblings = cs.alloc_pub_inputs(TREE_DEPTH);

        merkle_proofs.push(AssignedMerkleProof::new(merkle_siblings, merkle_indices));
    }

    // #############################################
    // Public inputs
    // #############################################

    let t_x = cs.alloc_pub_input();
    let t_y = cs.alloc_priv_input();

    let u_x = cs.alloc_pub_input();
    let u_y = cs.alloc_pub_input();

    // #############################################
    // Constraints
    // #############################################

    // 1. Recover the public key from the signature
    // S_mul_t = s * T;
    let t = AffinePoint::new(t_x, t_y);
    let s_mul_t = ec_mul(t, &s_bits, cs);

    // pubkey = sMultT + U
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

    // Get the Etherreum address from public key
    let address = to_addr(pub_key_bits.try_into().unwrap());

    let poseidon_chip = PoseidonChip::new(cs, secp256k1_w3());

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

pub fn to_cs_field(x: ark_secp256k1::Fq) -> ark_secp256k1::Fr {
    ark_secp256k1::Fr::from(x.into_bigint())
}

// #[cfg(test)]
// mod tests {
//     use super::*;
//     use crate::uti
// }
