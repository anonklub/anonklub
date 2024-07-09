// use anyhow::{anyhow, Context, Result};
// use halo2_base::halo2_proofs::halo2curves::secp256k1;
// use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, Halo2Wasm};
// use num_bigint::BigUint;

// use crate::eth_membership::{EthMembershipCircuit, EthMembershipInputs};

// pub fn create_circuit(
//     s: secp256k1::Fq,
//     r: secp256k1::Fq,
//     msg_hash: BigUint,
//     is_y_odd: bool,
//     halo2_wasm: &Halo2Wasm,
// ) -> Result<EthMembershipCircuit<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>> {
//     // Compute the efficient ECDSA inputs
//     // TODO: Generalize recover_pk_efficient
//     let (U, T) =
//         recover_pk_efficient(msg_hash, r, is_y_odd).context("Failed to recover the PK!")?;

//     let ecdsa_inputs = EthMembershipInputs::new(s, T, U, );

//     let circuit = EthMembershipCircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
//         halo2_wasm,
//         ecdsa_inputs,
//     )
//     .map_err(|e| anyhow!(e))
//     .context("Failed to initialize the circuit!")?;

//     Ok(circuit)
// }
