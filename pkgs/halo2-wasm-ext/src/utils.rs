use std::{fs::File, io::Cursor};

use anyhow::{anyhow, Context, Result};
use halo2_base::halo2_proofs::{
    halo2curves::secp256k1,
    poly::{commitment::Params, kzg::commitment::ParamsKZG},
};
use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, CircuitConfig, Halo2Wasm};
use num_bigint::BigUint;
use rand_core::OsRng;
use std::result::Result as StdResult;
use subtle::CtOption;

use crate::circuits::efficient_ecdsa::{EfficientECDSACircuit, EfficientECDSAInputs};

use super::consts::E;

/// @src https://github.com/privacy-scaling-explorations/zkevm-circuits/blob/main/eth-types/src/sign_types.rs
/// Helper function to convert a `CtOption` into an `Result`.  Similar to
/// `Option::ok_or`.
/// TODO: switch to anyhow result
pub fn ct_option_ok_or<T, E>(v: CtOption<T>, err: E) -> StdResult<T, E> {
    Option::<T>::from(v).ok_or(err)
}

pub fn create_circuit(
    s: secp256k1::Fq,
    r: secp256k1::Fq,
    msg_hash: BigUint,
    is_y_odd: bool,
    halo2_wasm: &Halo2Wasm,
) -> Result<EfficientECDSACircuit<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>> {
    // Compute the efficient ECDSA inputs
    // TODO: Generalize recover_pk_efficient
    let (U, T) =
        recover_pk_efficient(msg_hash, r, is_y_odd).context("Failed to recover the PK!")?;

    let ecdsa_inputs = EfficientECDSAInputs::new(s, T, U);

    let circuit = EfficientECDSACircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
        halo2_wasm,
        ecdsa_inputs,
    )
    .map_err(|e| anyhow!(e))
    .context("Failed to initialize the circuit!")?;

    Ok(circuit)
}
