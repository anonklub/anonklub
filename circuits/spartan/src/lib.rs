mod eth_membership;
mod utils;

use crate::utils::{efficient_ecdsa, verify_efficient_ecdsa};
use ark_ff::BigInteger;
use ark_secp256k1::{Affine, Fq, Fr};
use eth_membership::eth_membership;
use sapir::{circuit, wasm::prelude::*};

type Curve = sapir::ark_secq256k1::Projective;
type F = ark_secq256k1::Fr;

// Produce the code to generate and verify the proof of the `eth_membership` circuit.
// We wrap the `prove` and `verify` functions with additional logic
// and expose them to the JavaScript runtime.
circuit!(
    |cs: &mut ConstraintSystem<F>| { eth_membership(cs) },
    Curve,
    b"creddd"
);


pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
