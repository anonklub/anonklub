use anyhow::{anyhow, Context, Result};
use halo2_base::{halo2_proofs::halo2curves::secp256k1, utils::ScalarField};
use halo2_binary_merkle_tree::binary_merkle_tree::{MerkleProof, MerkleProofBytes};
use halo2_ecdsa::{
    gadget::efficient_ecdsa::EfficientECDSAInputs, utils::recovery::recover_pk_efficient,
};
use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, Halo2Wasm};
use num_bigint::BigUint;

use crate::eth_membership::{EthMembershipCircuit, EthMembershipInputs};

use super::consts::F;

pub fn create_default_circuit(
    halo2_wasm: &Halo2Wasm,
) -> Result<EthMembershipCircuit<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>> {
    let default_efficient_ecdsa = EfficientECDSAInputs::new(
        secp256k1::Fq::zero(),
        Secp256k1Affine::generator(),
        Secp256k1Affine::generator(),
    );

    let default_merkle_proof = MerkleProof {
        depth: 0,
        leaf: F::from(F::zero()),
        siblings: vec![F::zero()],
        path_indices: vec![F::zero()],
        root: F::from(F::zero()),
    };

    let default_eth_membership_inputs = EthMembershipInputs::<
        secp256k1::Fp,
        secp256k1::Fq,
        Secp256k1Affine,
    >::new(default_efficient_ecdsa, default_merkle_proof);

    let default_circuit =
        EthMembershipCircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
            halo2_wasm,
            default_eth_membership_inputs,
        )
        .map_err(|e| anyhow!(e))
        .context("Failed to initialize the circuit!")?;

    Ok(default_circuit)
}

pub fn create_circuit(
    s: &[u8],
    r: &[u8],
    msg_hash: &[u8],
    is_y_odd: bool,
    merkle_proof_bytes_serialized: &[u8],
    halo2_wasm: &Halo2Wasm,
) -> Result<EthMembershipCircuit<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>> {
    // Deserialize the inputs
    let s = secp256k1::Fq::from_bytes_le(s);
    let r = secp256k1::Fp::from_bytes_le(r);

    let msg_hash_biguint = BigUint::from_bytes_be(msg_hash);

    let merkle_proof_bytes = MerkleProofBytes::deserialize(merkle_proof_bytes_serialized)
        .context("Failed to deserialize merkle proof bytes")?;
    let merkle_proof = MerkleProof::from_bytes_le(&merkle_proof_bytes)
        .context("Failed to deserialize merkle proof")?;

    // Compute the efficient ECDSA inputs
    // TODO: Generalize recover_pk_efficient
    let (U, T) =
        recover_pk_efficient(msg_hash_biguint, r, is_y_odd).context("Failed to recover the PK!")?;

    let efficient_ecdsa =
        EfficientECDSAInputs::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(s, T, U);

    let eth_membership_inputs =
        EthMembershipInputs::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
            efficient_ecdsa,
            merkle_proof,
        );

    let circuit = EthMembershipCircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
        halo2_wasm,
        eth_membership_inputs,
    )
    .map_err(|e| anyhow!(e))
    .context("Failed to initialize the circuit!")?;

    Ok(circuit)
}
