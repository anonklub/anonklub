#![allow(non_camel_case_types)]
use halo2_base::halo2_proofs::halo2curves::bn256;
use halo2_ecc::fields::fp;

pub type F = bn256::Fr; // Scalar Native FF;

// Scalar Field and Base Field chips based on Scalar F
pub type FpChip<'range, F, CF> = fp::FpChip<'range, F, CF>;
pub type FqChip<'range, F, SF> = fp::FpChip<'range, F, SF>;

pub const LIMB_BITS: usize = 88;
pub const NUM_LIMBS: usize = 3;
pub const FIXED_WINDOW_BITS: usize = 4;
pub const CONTEXT_PHASE: usize = 0;
