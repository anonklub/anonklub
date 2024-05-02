use num_bigint::BigUint;
use std::{result::Result, str::from_utf8};
use subtle::CtOption;

/// @src https://github.com/privacy-scaling-explorations/zkevm-circuits/blob/main/eth-types/src/sign_types.rs
/// Helper function to convert a `CtOption` into an `Result`.  Similar to
/// `Option::ok_or`.
pub fn ct_option_ok_or<T, E>(v: CtOption<T>, err: E) -> Result<T, E> {
    Option::<T>::from(v).ok_or(err)
}

pub fn to_bigint(s: &str) -> BigUint {
    let chunks = s[2..]
        .as_bytes()
        .chunks(16)
        .rev()
        .map(|chunk| from_utf8(chunk).unwrap())
        .map(|s| u64::from_str_radix(s, 16).unwrap())
        .collect::<Vec<_>>();

    let mut bigint = BigUint::from(0u64);
    let base: BigUint = BigUint::from(2u64).pow(64);

    // Construct biguint from chunks
    for (i, value) in chunks.iter().enumerate() {
        bigint += BigUint::from(*value) * &base.pow(i as u32);
    }

    bigint
}

/// @src https://github.com/privacy-scaling-explorations/zkevm-circuits/blob/main/eth-types/src/sign_types.rs#L155
/// Return a copy of the serialized public key with swapped Endianness.
pub fn pk_bytes_swap_endianness<T: Clone>(actual_pk: &[T]) -> [T; 64] {
    assert_eq!(actual_pk.len(), 64);
    let mut pk_swap = <&[T; 64]>::try_from(actual_pk)
        .cloned()
        .expect("actual_pk.len() != 64");
    pk_swap[..32].reverse();
    pk_swap[32..].reverse();
    pk_swap
}
