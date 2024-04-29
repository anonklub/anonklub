use num_bigint::BigUint;
use std::{result::Result, str::from_utf8};
use subtle::CtOption;

/// @src https://github.com/privacy-scaling-explorations/zkevm-circuits/blob/main/eth-types/src/sign_types.rs
/// Helper function to convert a `CtOption` into an `Result`.  Similar to
/// `Option::ok_or`.
pub fn ct_option_ok_or<T, E>(v: CtOption<T>, err: E) -> Result<T, E> {
    Option::<T>::from(v).ok_or(err)
}

pub fn to_u64_array(bytes: &[u8]) -> Result<[u64; 4], String> {
    if bytes.len() > 32 {
        return Err("Byte array too large to convert to Fq".to_string());
    }

    let mut array = [0u64; 4];
    for (i, chunk) in bytes.chunks_exact(8).enumerate() {
        array[i] = u64::from_be_bytes(chunk.try_into().unwrap_or_else(|_| [0u8; 8]));
    }

    Ok(array)
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

pub trait ToU64Array {
    fn to_u64_array(&self) -> Result<[u64; 4], String>;
}

impl ToU64Array for Vec<u8> {
    fn to_u64_array(&self) -> Result<[u64; 4], String> {
        if self.len() > 32 {
            return Err("Byte array too large to convert to Fq".to_string());
        }

        let mut padded_bytes = [0u8; 32];
        padded_bytes[(32 - self.len())..].copy_from_slice(self);

        let mut u64_array = [0u64; 4];
        for (i, chunk) in padded_bytes.chunks_exact(8).enumerate() {
            let array_chunk: [u8; 8] = chunk
                .try_into()
                .map_err(|_| "Failed to convert slice to array".to_string())?;
            u64_array[i] = u64::from_be_bytes(array_chunk);
        }

        Ok(u64_array)
    }
}
