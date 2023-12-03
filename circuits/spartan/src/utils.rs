use ark_ec::{AffineRepr, CurveGroup};
use ark_ff::{BigInteger, Field, PrimeField};
use ark_secp256k1::Affine;
use ark_secp256k1::Fq;
use ark_secp256k1::Fr;
use num_bigint::BigUint;

// Recover the point from the x coordinate and the parity bit
// following the SEC 1 spec https://www.secg.org/sec1-v2.pdf
pub fn from_x(x: Fq, is_y_odd: bool) -> Affine {
    let y_squared = x * x * x + Fq::from(7u32);
    let y = y_squared.sqrt().unwrap();

    if y.into_bigint().to_bits_le()[0] == !is_y_odd {
        Affine::new(x, y)
    } else {
        Affine::new(x, -y)
    }
}

pub fn efficient_ecdsa(msg_hash: BigUint, r: Fq, is_y_odd: bool) -> (Affine, Affine) {
    let g = Affine::generator();

    // Recover the `R` point
    let r_point = from_x(r, is_y_odd);

    let one = BigUint::from(1u32);
    let modulus = BigUint::from(Fr::MODULUS);

    let r_inv_mod_n = Fr::from(BigUint::from(r.into_bigint())).inverse().unwrap();

    // W = r^-1 * msg
    let w = -Fr::from(BigUint::from(msg_hash).modpow(&one, &modulus)) * r_inv_mod_n;
    // u = -(w * G) = -(r^-1 * msg * G)
    let u = (g * w).into_affine();

    // t = r^-1 * R
    let t = (r_point * r_inv_mod_n).into_affine();

    (u, t)
}

// Verify that `T` and `U` are computed correctly
pub fn verify_efficient_ecdsa(
    msg_hash: BigUint,
    r: Fq,
    is_y_odd: bool,
    t: Affine,
    u: Affine,
) -> bool {
    let (expected_u, expected_t) = efficient_ecdsa(msg_hash, r, is_y_odd);

    u == expected_u && t == expected_t
}

#[cfg(test)]
pub mod test_utils {
    use super::*;
    use ethers::types::H160;
    use ethers::{
        prelude::*,
        utils::{hash_message, secret_key_to_address},
    };
    use k256::{ecdsa::SigningKey, elliptic_curve::ScalarPrimitive, SecretKey};

    pub struct MockEffEcdsaInput {
        pub s: Fr,
        pub u: Affine,
        pub t: Affine,
        pub msg_hash: BigUint,
        pub pub_key: Affine,
        pub address: H160,
    }

    pub fn mock_sig(priv_key: u64) -> (Fr, Fq, bool, BigUint, Affine, H160) {
        let signing_key = SigningKey::from(SecretKey::new(ScalarPrimitive::from(priv_key)));
        let g = Affine::generator();
        let pub_key = (g * Fr::from(priv_key)).into_affine();
        let address = secret_key_to_address(&signing_key);

        let message = b"hello Anonklub";
        let msg_hash = hash_message(message);
        let msg_hash_bigint = BigUint::from_bytes_be(&msg_hash.to_fixed_bytes());
        let wallet = Wallet::from(signing_key);
        let sig = wallet.sign_hash(msg_hash).unwrap();

        let mut s = [0u8; 32];
        let mut r = [0u8; 32];
        sig.s.to_big_endian(&mut s);
        sig.r.to_big_endian(&mut r);

        let is_y_odd = sig.v == 27;

        let s = Fr::from(BigUint::from_bytes_be(&s));
        let r = Fq::from(BigUint::from_bytes_be(&r));

        (s, r, is_y_odd, msg_hash_bigint, pub_key, address)
    }

    pub fn mock_eff_ecdsa_input(priv_key: u64) -> MockEffEcdsaInput {
        let (s, r, is_y_odd, msg_hash_bigint, pub_key, address) = mock_sig(priv_key);
        let (u, t) = efficient_ecdsa(msg_hash_bigint.clone(), r, is_y_odd);

        MockEffEcdsaInput {
            s,
            u,
            t,
            msg_hash: msg_hash_bigint,
            pub_key,
            address,
        }
    }
}

mod tests {
    use super::*;
    
    use crate::utils::test_utils::mock_eff_ecdsa_input;

    #[test]
    fn test_eff_ecdsa() {
        let mock_eff_ecdsa = mock_eff_ecdsa_input(42);

        // s * T + U = pubkey
        let recovered_pubkey =
            ((mock_eff_ecdsa.t * mock_eff_ecdsa.s).into_affine() + mock_eff_ecdsa.u).into_affine();
        assert_eq!(recovered_pubkey, mock_eff_ecdsa.pub_key);
    }
}
