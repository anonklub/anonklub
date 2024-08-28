use super::{consts::F, recovery::recover_pk_efficient};
use anyhow::{anyhow, Result};
use halo2_base::{
    halo2_proofs::halo2curves::secp256k1,
    utils::{biguint_to_fe, fe_to_biguint, modulus, CurveAffineExt},
};
use halo2_wasm_ext::utils::ct_option_ok_or;
use num_bigint::BigUint;
use std::iter::zip;

#[allow(dead_code)]
pub fn verify_efficient_ecdsa(
    msg_hash: BigUint,
    r: secp256k1::Fp,
    is_y_odd: bool,
    instances: &[u8],
) -> Result<bool> {
    // Deserialize instances into Native base finite fields
    let actual = instances
        .chunks(32)
        .map(|chunk| {
            let bytes: [u8; 32] = chunk.try_into().expect("slice with incorrect length");
            let instance = ct_option_ok_or(
                F::from_bytes(&bytes),
                anyhow!("Failed to convert instances into F."),
            )?;
            Ok(instance)
        })
        .collect::<Result<Vec<F>>>()?;

    let (U_expected, T_expected) = recover_pk_efficient(msg_hash, r, is_y_odd)?;

    let (T_x_expected, T_y_expected) = T_expected.into_coordinates();
    let (U_x_expected, U_y_expected) = U_expected.into_coordinates();

    // Convert Expected precompute values from Secp256k1 Affine into Bn256 scalar finite fields
    let native_modules = modulus::<F>();
    let expected = [T_x_expected, T_y_expected, U_x_expected, U_y_expected]
        .iter()
        .map(|expected_value| {
            let expected_value_biguint = fe_to_biguint(expected_value);

            biguint_to_fe::<F>(&(&expected_value_biguint % &native_modules))
        })
        .collect::<Vec<F>>();

    let is_efficient_ecdsa_verified = zip(actual.iter(), expected.iter()).all(|(a, e)| a == e);

    Ok(is_efficient_ecdsa_verified)
}
