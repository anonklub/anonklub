use crate::{Curve, MembershipProof};
use ark_ec::{AffineRepr, CurveGroup};
use ark_ff::{BigInteger, Field, PrimeField};
use ark_secp256k1::Affine;
use ark_secp256k1::Fq;
use ark_secp256k1::Fr;

use num_bigint::BigUint;
use sapir::wasm::prelude::*;

// chore: trigger test-rs ci job

// Recover the point from the x coordinate and the parity bit
// following the SEC 1 spec https://www.secg.org/sec1-v2.pdf
pub fn from_x(x: Fq, is_y_odd: bool) -> Affine {
    let y_squared = x * x * x + Fq::from(7u32);
    let y = y_squared.sqrt().unwrap();
    let is_y_odd_value = y.into_bigint().to_bits_le()[0];
    if is_y_odd_value != is_y_odd {
        Affine::new(x, y)
    } else {
        Affine::new(x, -y)
    }
}

// Compute `T` and `U` for efficient ECDSA verification
pub fn efficient_ecdsa(msg_hash: BigUint, r: Fq, is_y_odd: bool) -> (Affine, Affine) {
    let g = Affine::generator();

    // Recover the `R` point
    let r_point = from_x(r, is_y_odd);

    let one = BigUint::from(1u32);
    let modulus: BigUint = BigUint::from(Fr::MODULUS);

    let r_inv_mod_n = Fr::from(BigUint::from(r.into_bigint())).inverse().unwrap();

    // w = r^-1 * msg
    let msg_hash = msg_hash.modpow(&one, &modulus);
    let msg_hash = Fr::from(msg_hash);
    let w = -msg_hash * r_inv_mod_n;

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

    t == expected_t && u == expected_u
}

// Get the Merkle root from the proof's public input
#[wasm_bindgen]
pub fn get_roots(anonklub_proof: &[u8]) -> Vec<u8> {
    let anonklub_proof = MembershipProof::deserialize_compressed(anonklub_proof).unwrap();
    let spartan_proof =
        SpartanProof::<Curve>::deserialize_compressed(anonklub_proof.proof.as_slice()).unwrap();
    let pub_iputs = spartan_proof.pub_input.clone();
    // The first 4 elements of the public input are the efficient ECDSA input
    let roots = &pub_iputs[4..];

    roots
        .iter()
        .flat_map(|x| x.into_bigint().to_bytes_be())
        .collect()
}

// Get hte message hash from the proof's public input
#[wasm_bindgen]
pub fn get_msg_hash(anonklub_proof: &[u8]) -> Vec<u8> {
    let anonklub_proof = MembershipProof::deserialize_compressed(anonklub_proof).unwrap();
    anonklub_proof.msg_hash.to_bytes_be()
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

        let message = b"harry AnonKlub";
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

#[cfg(test)]
mod tests {
    use ethers::types::U256;

    use crate::utils::test_utils::mock_eff_ecdsa_input;

    use super::*;

    #[test]
    fn test_eff_ecdsa() {
        let mock_eff_ecdsa = mock_eff_ecdsa_input(42);

        // s * T + U = pubkey
        let recovered_pubkey =
            ((mock_eff_ecdsa.t * mock_eff_ecdsa.s).into_affine() + mock_eff_ecdsa.u).into_affine();
        assert_eq!(recovered_pubkey, mock_eff_ecdsa.pub_key);
    }

    #[test]
    fn test_eff_ecdsa_mock() {
        let msg_hash: &[u8] = &[
            22, 135, 10, 17, 137, 45, 126, 150, 177, 100, 58, 95, 81, 26, 192, 27, 9, 169, 9, 251,
            145, 253, 126, 58, 48, 123, 123, 33, 178, 58, 12, 67,
        ];
        let msg_hash_biguint = BigUint::from_bytes_be(msg_hash);
        let r_hex = U256::from_str_radix(
            "0x50b2d094f8f3cda8c57ef4f82988bbe84a7dd6ee1cd4c641389ecadc7b285bb5",
            16,
        )
        .expect("Failed to convert r_hex");
        let s_hex = U256::from_str_radix(
            "0x4e2c21653c6bb5cc88c7d76da422dcc7b3a271ab783c70f324ec8462afd5a54a",
            16,
        )
        .expect("Failed to convert s_hex");

        let mut r_be_bytes = [0u8; 32];
        r_hex.to_big_endian(&mut r_be_bytes);

        let mut s_be_bytes = [0u8; 32];
        s_hex.to_big_endian(&mut s_be_bytes);

        let s = Fr::from(BigUint::from_bytes_be(&s_be_bytes));
        let r = Fq::from(BigUint::from_bytes_be(&r_be_bytes));

        let (u, t) = efficient_ecdsa(msg_hash_biguint.clone(), r, false);

        // s * T + U = pubkey
        let recovered_pubkey = ((t * s).into_affine() + u).into_affine();

        print!("Help")
    }
}
