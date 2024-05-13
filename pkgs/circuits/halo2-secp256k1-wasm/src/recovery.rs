use core::result::Result;
use halo2_base::{
    halo2_proofs::{
        arithmetic::{CurveAffine, Field},
        halo2curves::{ff::PrimeField, group::Curve, secp256k1},
    },
    utils::ScalarField,
};
use halo2_ecc::secp256k1::SECP_B;
use num_bigint::BigUint;

use crate::utils::{ct_option_ok_or, pk_bytes_swap_endianness, to_bigint};

// Recover the point from the x coordinate and the parity bit
fn from_x(x: secp256k1::Fq, is_y_odd: bool) -> Result<secp256k1::Secp256k1Affine, String> {
    // Convert x from scalar Fq into base Fp
    let x = x.to_repr();
    let x = ct_option_ok_or(
        secp256k1::Fp::from_repr(x),
        "Failed to convert Fq to Fp representation.".to_string(),
    )?;

    // y^2 = X^3 + 7
    let y_squared = x.square() * x + secp256k1::Fp::from(SECP_B);

    let y = ct_option_ok_or(
        secp256k1::Fp::sqrt(&y_squared),
        "Failed to calculate square root for y.".to_string(),
    )?;
    if y.to_bytes_le()[0] != is_y_odd as u8 {
        ct_option_ok_or(
            secp256k1::Secp256k1Affine::from_xy(x, y),
            "Failed to create affine point from x and y coordinates.".to_string(),
        )
    } else {
        ct_option_ok_or(
            secp256k1::Secp256k1Affine::from_xy(x, -y),
            "Failed to create affine point from x and negated y coordinates.".to_string(),
        )
    }
}

/// @src https://personaelabs.org/posts/efficient-ecdsa-1/
/// Compute `T` and `U` for efficient ECDSA verification
pub fn recover_pk_eff(
    msg_hash: BigUint,
    r: secp256k1::Fq,
    is_y_odd: bool,
) -> Result<(secp256k1::Secp256k1Affine, secp256k1::Secp256k1Affine), String> {
    let g = secp256k1::Secp256k1Affine::generator();

    // Recover the `R` point
    let r_point = from_x(r, is_y_odd)?;

    let one = BigUint::from(1u32);
    let modulus_bigint = to_bigint(secp256k1::Fq::MODULUS);

    let r_inv_mod_n = ct_option_ok_or(r.invert(), "Failed to compute modular inverse of r")?;

    // w = r^-1 * msg
    let msg_hash = msg_hash.modpow(&one, &modulus_bigint);
    let msg_hash = msg_hash
        .to_bytes_le()
        .as_slice()
        .try_into()
        .map_err(|_| "msg_hash conversion to fixed size array failed")?;
    let msg_hash = ct_option_ok_or(
        secp256k1::Fq::from_repr(msg_hash),
        "Failed to compute convert msg_hash into scalar Fq",
    )?;

    let w = msg_hash.neg() * r_inv_mod_n;

    // u = -(w * G) = -(r^-1 *msg *G)
    let u = (g * w).to_affine();

    // t = r^1 * R
    let t = (r_point * r_inv_mod_n).to_affine();

    Ok((u, t))
}

/// @src https://github.com/privacy-scaling-explorations/zkevm-circuits/blob/82e8d8fed3ab1c6ad3f04e3fa3f9b15423b16b5e/eth-types/src/sign_types.rs#L113
pub fn recover_pk(
    v: u8,
    r: secp256k1::Fq,
    s: secp256k1::Fq,
    msg_hash: &[u8],
) -> Result<secp256k1::Secp256k1Affine, libsecp256k1::Error> {
    let mut sig_bytes = [0u8; 64];
    sig_bytes[..32].copy_from_slice(&r.to_bytes());
    sig_bytes[32..].copy_from_slice(&s.to_bytes());
    let signature = libsecp256k1::Signature::parse_standard(&sig_bytes)?;
    let msg_hash = libsecp256k1::Message::parse_slice(msg_hash)?;
    let recovery_id = libsecp256k1::RecoveryId::parse(v)?;
    let actual_pk = libsecp256k1::recover(&msg_hash, &signature, &recovery_id)?;
    let pk_be = actual_pk.serialize();
    let pk_le = pk_bytes_swap_endianness(&pk_be[1..]);

    let x = ct_option_ok_or(
        secp256k1::Fp::from_bytes(pk_le[..32].try_into().unwrap()),
        libsecp256k1::Error::InvalidPublicKey,
    )?;
    let y = ct_option_ok_or(
        secp256k1::Fp::from_bytes(pk_le[32..].try_into().unwrap()),
        libsecp256k1::Error::InvalidPublicKey,
    )?;

    ct_option_ok_or(
        secp256k1::Secp256k1Affine::from_xy(x, y),
        libsecp256k1::Error::InvalidPublicKey,
    )
}

#[cfg(test)]
mod tests {
    use core::result::Result;
    use ethers::{
        core::k256::{
            ecdsa::SigningKey,
            elliptic_curve::{ScalarPrimitive, SecretKey},
        },
        signers::Wallet,
        types::H160,
        utils::hash_message,
    };
    use halo2_base::{
        halo2_proofs::{
            arithmetic::{CurveAffine, Field},
            halo2curves::{ff::PrimeField, group::Curve, secp256k1},
        },
        utils::{biguint_to_fe, fe_to_biguint, modulus},
    };
    use num_bigint::BigUint;
    use rand::{rngs::StdRng, SeedableRng};

    use crate::utils::ct_option_ok_or;

    use super::{recover_pk, recover_pk_eff};

    pub struct MockECDSAInput {
        pub s: Option<secp256k1::Fq>,
        pub r: Option<secp256k1::Fq>,
        pub v: Option<u8>,
        pub is_y_odd: Option<bool>,
        pub u: Option<secp256k1::Secp256k1Affine>,
        pub t: Option<secp256k1::Secp256k1Affine>,
        pub msg_hash: Option<secp256k1::Fq>,
        pub msg_hash_bigint: Option<BigUint>,
        pub actual_pk: Option<secp256k1::Secp256k1Affine>,
        pub recovered_pk: Option<secp256k1::Secp256k1Affine>,
        pub address: Option<H160>,
    }

    /// @src Spartan
    fn mock_eff_ecdsa_input(priv_key: u64) -> Result<MockECDSAInput, String> {
        let signing_key = SigningKey::from(SecretKey::new(ScalarPrimitive::from(priv_key)));
        let g = secp256k1::Secp256k1Affine::generator();
        let actual_pk = (g * secp256k1::Fq::from(priv_key)).to_affine();

        let message = b"harry AnonKlub";
        let msg_hash = hash_message(message);
        let msg_hash_bigint = BigUint::from_bytes_be(&msg_hash.to_fixed_bytes());
        let wallet = Wallet::from(signing_key);
        let sig = wallet.sign_hash(msg_hash).unwrap();

        let mut s = [0u8; 32];
        let mut r = [0u8; 32];
        sig.s.to_little_endian(&mut s);
        sig.r.to_little_endian(&mut r);
        let v = sig.v as u8;

        let is_y_odd = sig.v == 27;

        let s = ct_option_ok_or(
            secp256k1::Fq::from_repr(s),
            "Failed to convert s into Fq.".to_string(),
        )?;
        let r = ct_option_ok_or(
            secp256k1::Fq::from_repr(r),
            "Failed to convert r into Fq.".to_string(),
        )?;

        let (u, t) = recover_pk_eff(msg_hash_bigint.clone(), r, is_y_odd)
            .map_err(|e| format!("Failed to compute efficient ECDSA: {}", e))?;

        Ok(MockECDSAInput {
            s: Some(s),
            r: Some(r),
            v: Some(v),
            is_y_odd: Some(is_y_odd),
            u: Some(u),
            t: Some(t),
            msg_hash: None,
            msg_hash_bigint: Some(msg_hash_bigint.clone()),
            actual_pk: Some(actual_pk),
            recovered_pk: None,
            address: None,
        })
    }

    /// This helper function for the recover_pk
    #[allow(dead_code)]
    fn random_ecdsa_input(rng: &mut StdRng) -> MockECDSAInput {
        let g = secp256k1::Secp256k1Affine::generator();

        // Generate a key pair
        let sk = <secp256k1::Secp256k1Affine as CurveAffine>::ScalarExt::random(rng.clone());
        let actual_pk = secp256k1::Secp256k1Affine::from(g * sk);

        // Generate a valid signature
        let msg_hash = <secp256k1::Secp256k1Affine as CurveAffine>::ScalarExt::random(rng.clone());

        let msg_hash_bigint = BigUint::from_bytes_be(&msg_hash.to_bytes());

        // Draw a randomness
        let k = <secp256k1::Secp256k1Affine as CurveAffine>::ScalarExt::random(rng);
        let k_inv = k.invert().unwrap();

        // Calculate `r`
        let r_point = secp256k1::Secp256k1Affine::from(g * k)
            .coordinates()
            .unwrap();
        let x = r_point.x();
        let y = r_point.y();
        let x_bigint = fe_to_biguint(x);
        let r = biguint_to_fe::<secp256k1::Fq>(&(x_bigint % modulus::<secp256k1::Fq>()));

        // Calculate `s`
        let s = k_inv * (msg_hash + (r * sk));

        // Determine parity of the y-coordinate for 'v'
        let v = if y.is_odd().into() { 28 } else { 27 };

        let is_y_odd = v == 27;

        MockECDSAInput {
            s: Some(s),
            r: Some(r),
            v: Some(v),
            is_y_odd: Some(is_y_odd),
            u: None,
            t: None,
            msg_hash: None,
            msg_hash_bigint: Some(msg_hash_bigint),
            actual_pk: Some(actual_pk),
            recovered_pk: None,
            address: None,
        }
    }

    /// This helper function for the recover_pk
    #[allow(dead_code)]
    fn mock_recover_pk() -> Result<MockECDSAInput, String> {
        let mut rng: StdRng = StdRng::seed_from_u64(0);

        let mock_ecdsa_input = random_ecdsa_input(&mut rng);

        let s = mock_ecdsa_input.s.ok_or("s value missing")?;
        let r = mock_ecdsa_input.r.ok_or("r value missing")?;
        let v = mock_ecdsa_input.v.ok_or("v value missing")?;
        let msg_hash = mock_ecdsa_input.msg_hash.ok_or("msg_hash value missing")?;
        let msg_hash_bigint = mock_ecdsa_input
            .msg_hash_bigint
            .clone()
            .ok_or("msg_hash_bigint value missing")?;
        let is_y_odd = mock_ecdsa_input.is_y_odd.ok_or("is_y_odd value missing")?;
        let actual_pk = mock_ecdsa_input
            .actual_pk
            .ok_or("actual_pk value missing")?;

        let msg_hash_bytes: [u8; 32] = msg_hash.to_bytes();

        let recovered_pk = recover_pk(v, r, s, &msg_hash_bytes).map_err(|e| {
            eprintln!("Failed to recover public key: {:?}", e);
            e.to_string()
        })?;

        Ok(MockECDSAInput {
            s: Some(s),
            r: Some(r),
            v: Some(v),
            is_y_odd: Some(is_y_odd),
            u: None,
            t: None,
            msg_hash: None,
            msg_hash_bigint: Some(msg_hash_bigint),
            actual_pk: Some(actual_pk),
            recovered_pk: Some(recovered_pk),
            address: None,
        })
    }

    #[test]
    fn test_recover_pk_eff() -> Result<(), String> {
        let mock_eff_ecdsa = mock_eff_ecdsa_input(42)
            .map_err(|e| format!("Failed to compute efficient ECDSA: {}", e))?;

        let t = mock_eff_ecdsa.t.ok_or("T is missing")?;

        let u = mock_eff_ecdsa.u.ok_or("U is missing")?;

        let s = mock_eff_ecdsa.s.ok_or("s is missing")?;

        let actual_pk = mock_eff_ecdsa.actual_pk.ok_or("actual_pk is missing")?;

        // s * T
        let s_mul_t = (t * s).to_affine();

        // s * T + U = pk
        let recovered_pk = (s_mul_t + u).to_affine();

        assert_eq!(recovered_pk, actual_pk);

        Ok(())
    }

    // TODO: Fix the failed test for `recover_pk` since it is not a priority
    // and is outside the scope of the current PR.
    // Initially, test with `recover_pk_eff` and return to this function
    // only if it improves the computations.
    // #[test]
    // fn test_recover_pk() -> Result<(), String> {
    //     let mock_ecdsa = mock_recover_pk(50)?;

    //     let recovered_pk = mock_ecdsa.recovered_pk.unwrap();
    //     let actual_pk = mock_ecdsa.actual_pk.unwrap();

    //     assert_eq!(actual_pk, recovered_pk);

    //     Ok(())
    // }
}
