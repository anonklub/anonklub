use std::borrow::BorrowMut;

use anyhow::{anyhow, Context, Result};
use ethers::{abi::Address, types::U256};
use gloo_utils::format::JsValueSerdeExt;
use halo2_base::{
    halo2_proofs::halo2curves::{group::Curve, secp256k1},
    utils::ScalarField,
};
use halo2_binary_merkle_tree::binary_merkle_tree::{MerkleProof, MerkleProofBytes};
use halo2_ecdsa::{
    gadget::efficient_ecdsa::EfficientECDSAInputs,
    utils::recovery::{
        pk_bytes_le, pk_bytes_swap_endianness, recover_pk, recover_pk_efficient, ToBigEndian,
        ToLittleEndian,
    },
};
use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, Halo2Wasm};
use hex::encode;
use log::{info, Level};
use num_bigint::BigUint;
use serde::Serialize;
use tiny_keccak::{Hasher, Keccak};
use wasm_bindgen::prelude::*;

use crate::eth_membership::{EthMembershipCircuit, EthMembershipInputs};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

fn log_jsvalue(value: &impl Serialize) {
    let js_value = JsValue::from_serde(value).unwrap();
    log(&format!("{:?}", js_value));
}

pub fn create_circuit(
    s: &[u8],
    r: &[u8],
    msg_hash: &[u8],
    is_y_odd: bool,
    merkle_proof_bytes_serialized: &[u8],
    halo2_wasm: &Halo2Wasm,
) -> Result<EthMembershipCircuit<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>> {
    // Initialize logging
    console_log::init_with_level(Level::Info).expect("error initializing log");

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
