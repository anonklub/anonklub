#![allow(non_camel_case_types)]
use halo2_base::halo2_proofs::halo2curves::bn256::{self, Bn256};
use halo2_ecc::{
    ecc::EcPoint,
    fields::{fp, FieldChip},
};

pub type F = bn256::Fr; // Scalar Native FF;
#[allow(dead_code)]
pub type E = Bn256;

// Scalar Field and Base Field chips based on Scalar F
pub type FpChip<'range, F, CF> = fp::FpChip<'range, F, CF>;
pub type FqChip<'range, F, SF> = fp::FpChip<'range, F, SF>;

// EcPoint
pub type Point<'a, CF> = EcPoint<F, <FpChip<'a, F, CF> as FieldChip<F>>::FieldPoint>;

pub const LIMB_BITS: usize = 88;
pub const NUM_LIMBS: usize = 3;
pub const FIXED_WINDOW_BITS: usize = 4;
pub const CONTEXT_PHASE: usize = 0;
