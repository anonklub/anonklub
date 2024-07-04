#![allow(non_camel_case_types)]
use halo2_base::halo2_proofs::halo2curves::bn256::{self, Bn256, G1Affine};

// Scaler field of the E curve
pub type E = Bn256;
pub type E_AFFINE = G1Affine;
pub type F = bn256::Fr; // Scalar Native FF;
