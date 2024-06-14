use halo2_base::halo2_proofs::halo2curves::bn256::{self, Bn256};
use halo2_ecc::fields::fp;

// Scaler field of the E curve
pub type E = Bn256;
pub type F = bn256::Fr;

// Scalar Field and Base Field chips based on Scalar F
pub type FpChip<'range, F, CF> = fp::FpChip<'range, F, CF>;
pub type FqChip<'range, F, SF> = fp::FpChip<'range, F, SF>;

pub const K: usize = 15;
pub const LIMB_BITS: usize = 88;
pub const NUM_LIMBS: usize = 3;
pub const FIXED_WINDOW_BITS: usize = 4;
pub const CONTEXT_PHASE: usize = 0;
