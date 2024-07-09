#![allow(non_camel_case_types)]
#![allow(dead_code)]
use halo2_base::halo2_proofs::halo2curves::{
    bn256::{self, Bn256, G1Affine},
    secp256k1,
};
use halo2_ecc::fields::fp;

// Scaler field of the E curve
pub type E = Bn256;
pub type E_AFFINE = G1Affine;
pub type F = bn256::Fr; // Scalar Native FF;
pub type BF = bn256::Fq; // Base Native FF;
pub type CF = secp256k1::Fp;
pub type SF = secp256k1::Fq;

// Scalar Field and Base Field chips based on Scalar F
pub type FpChip<'range, F, CF> = fp::FpChip<'range, F, CF>;
pub type FqChip<'range, F, SF> = fp::FpChip<'range, F, SF>;

pub const K: u32 = 15;
pub const LIMB_BITS: usize = 88;
pub const NUM_LIMBS: usize = 3;
pub const FIXED_WINDOW_BITS: usize = 4;
pub const CONTEXT_PHASE: usize = 0;
pub const INSTANCE_COL: usize = 0;

/// Poseidon
/// `State` is structure `T` sized field elements that are subjected to
/// permutation
pub const T_POSEIDON: usize = 3;
pub const RATE_POSEIDON: usize = 2;
pub const R_F_POSEIDON: usize = 8;
pub const R_P_POSEIDON: usize = 57;
pub const SECURE_MDS_POSEIDON: usize = 0;
