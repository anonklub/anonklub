#![allow(non_snake_case)]
use halo2_base::utils::{BigPrimeField, CurveAffineExt};

// CF is the coordinate field of GA
// SF is the scalar field of GA
#[derive(Debug)]
pub struct EfficientECDSAInputs<CF, SF, GA>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    pub s: SF,
    pub T: GA,
    pub U: GA,
}

impl<CF, SF, GA> EfficientECDSAInputs<CF, SF, GA>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    pub fn new(s: SF, T: GA, U: GA) -> Self {
        Self { s, T, U }
    }
}
