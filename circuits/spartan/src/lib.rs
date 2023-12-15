mod eth_membership;
mod utils;

use crate::utils::{efficient_ecdsa, verify_efficient_ecdsa};
use ark_ff::BigInteger;
use ark_secp256k1::{Affine, Fq, Fr};
use ark_serialize::{CanonicalDeserialize, CanonicalSerialize};
use eth_membership::{eth_membership, to_cs_field, NUM_MERKLE_PROOFS, TREE_DEPTH};
use num_bigint::BigUint;
use sapir::constraint_system::ConstraintSystem;
use sapir::{circuit, wasm::prelude::*};
use web_sys::console;

pub type Curve = sapir::ark_secq256k1::Projective;
type F = ark_secq256k1::Fr;

// Produce the code to generate and verify the proof of the `eth_membership` circuit.
// We wrap the `prove` and `verify` functions with additional logic
// and expose them to the JavaScript runtime.
circuit!(
    |cs: &mut ConstraintSystem<F>| { eth_membership(cs) },
    Curve,
    b"anonklub"
);

// `MembershipProof` consists of a Spartan proof
// and auxiliary inputs necessary for full verification.
// This proof is serialized and passed around in the JavaScript runtime.
#[derive(CanonicalSerialize, CanonicalDeserialize)]
pub struct MembershipProof {
    pub proof: Vec<u8>,
    r: Fq,
    is_y_odd: bool,
    msg_hash: BigUint,
}

#[wasm_bindgen]
pub fn prove_membership(
    s: &[u8],
    r: &[u8],
    is_y_odd: bool,
    msg_hash: &[u8],
    merkle_siblings: &[u8],
    merkle_indices: &[u8],
    merkle_roots: &[u8],
) -> Vec<u8> {
    console::log_1(&"Starting prove_membership".into());
    assert!(merkle_siblings.len() == NUM_MERKLE_PROOFS * TREE_DEPTH * 32);
    assert!(merkle_indices.len() == NUM_MERKLE_PROOFS * TREE_DEPTH * 32);
    assert!(merkle_roots.len() == NUM_MERKLE_PROOFS * 32);

    console::log_1(&"Starting Deserialize the inputs".into());
    // Deserialize the inputs
    let s = Fr::from(BigUint::from_bytes_be(s));
    let r = Fq::from(BigUint::from_bytes_be(r));
    let msg_hash = BigUint::from_bytes_be(msg_hash);

    let merkle_siblings = merkle_siblings
        .to_vec()
        .chunks(32)
        .map(|sibling| F::from(BigUint::from_bytes_be(&sibling)))
        .collect::<Vec<F>>();

    let merkle_indices = merkle_indices
        .to_vec()
        .chunks(32)
        .map(|index| F::from(BigUint::from_bytes_be(&index)))
        .collect::<Vec<F>>();

    let merkle_roots = merkle_roots
        .to_vec()
        .chunks(32)
        .map(|root| F::from(BigUint::from_bytes_be(root)))
        .collect::<Vec<F>>();

    console::log_1(&"Starting computing the efficient ECDSA input".into());
    // Compute the efficient ECDSA input
    let (u, t) = efficient_ecdsa(msg_hash.clone(), r, is_y_odd);

    console::log_1(&"Starting constructing the private input".into());
    // Construct the private input
    let mut priv_input = vec![];

    let s_bits = s
        .into_bigint()
        .to_bits_le()
        .iter()
        .map(|b| F::from(*b))
        .collect::<Vec<F>>();

    priv_input.extend_from_slice(&s_bits);

    console::log_1(&"Starting append the Merkle indices and siblings to the private input".into());
    // Append the Merkle indices and siblings to the private input
    for i in 0..NUM_MERKLE_PROOFS {
        priv_input.extend_from_slice(&merkle_indices[i * TREE_DEPTH..((i + 1) * TREE_DEPTH)]);
        priv_input.extend_from_slice(&merkle_siblings[i * TREE_DEPTH..((i + 1) * TREE_DEPTH)]);
    }

    console::log_1(&"Starting converting the private input to bytes".into());
    // Convert the private input to bytes
    let priv_input = priv_input
        .iter()
        .flat_map(|x| x.into_bigint().to_bytes_be())
        .collect::<Vec<u8>>();

    console::log_1(&"Starting constructing the public input".into());
    // Construct the public input
    let mut pub_input = vec![
        to_cs_field(t.x),
        to_cs_field(t.y),
        to_cs_field(u.x),
        to_cs_field(u.y),
    ];

    console::log_1(&"Starting appending the Merkle roots to the public input".into());
    // Append the Merkle roots to the public input
    for root in merkle_roots {
        pub_input.push(to_cs_field(root));
    }

    let pub_input = pub_input
        .iter()
        .flat_map(|x| x.into_bigint().to_bytes_be())
        .collect::<Vec<u8>>();

    console::log_1(&"Starting generating the proof".into());  
    // Generate the proof
    let proof = prove(&pub_input, &priv_input);

    let membership_proof = MembershipProof {
        proof,
        r,
        is_y_odd,
        msg_hash,
    };

    console::log_1(&"Starting serializing the full proof".into());  
    // Serialize the full proof
    let mut membership_proof_bytes = Vec::new();
    membership_proof
        .serialize_compressed(&mut membership_proof_bytes)
        .unwrap();

    membership_proof_bytes
}

#[wasm_bindgen]
pub fn verify_membership(anonklub_proof: &[u8]) -> bool {
    // Get the public input from the proof
    let anonklub_proof = MembershipProof::deserialize_compressed(anonklub_proof).unwrap();
    let spartan_proof =
        SpartanProof::<Curve>::deserialize_compressed(anonklub_proof.proof.as_slice()).unwrap();
    let pub_inputs = spartan_proof.pub_input.clone();

    let tx = pub_inputs[0];
    let ty = pub_inputs[1];
    let ux = pub_inputs[2];
    let uy = pub_inputs[3];

    let t = Affine::new(tx, ty);
    let u = Affine::new(ux, uy);

    let r = anonklub_proof.r;
    let is_y_odd = anonklub_proof.is_y_odd;
    let msg_hash = anonklub_proof.msg_hash;

    // Verify the proof
    let is_proof_valid = verify(&anonklub_proof.proof);

    // Verify the efficient ECDSA input
    let is_efficient_ecdsa_valid = verify_efficient_ecdsa(msg_hash, r, is_y_odd, t, u);

    is_proof_valid && is_efficient_ecdsa_valid
}
