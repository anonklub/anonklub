use crate::utils::consts::{FpChip, FqChip, Point};
use halo2_base::{
    utils::{BigPrimeField, CurveAffineExt},
    Context,
};
use halo2_ecc::{bigint::ProperCrtUint, ecc::EccChip, fields::FieldChip};
use halo2_wasm_ext::consts::F;

pub mod efficient_ecdsa;

pub fn recover_pk_efficient<'a, CF, SF, GA>(
    base_chip: &'a FpChip<'a, F, CF>,
    scalar_chip: &'a FqChip<'a, F, SF>,
    ecc_chip: &'a EccChip<'a, F, FpChip<'a, F, CF>>,
    ctx: &'a mut Context<F>,
    s: ProperCrtUint<F>,
    T: Point<'a, CF>,
    U: Point<'a, CF>,
    fixed_window_bits: usize,
) -> Point<'a, CF>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    // Check s is in [1, (n-1)]
    scalar_chip.is_soft_nonzero(ctx, &s);
    base_chip.enforce_less_than(ctx, T.x().clone());
    base_chip.enforce_less_than(ctx, U.x().clone());

    // Recover the public key from signature
    // s_mul_t = s * T
    let s_mul_t = ecc_chip.scalar_mult::<GA>(
        ctx,
        T,
        s.limbs().to_vec(),
        base_chip.limb_bits,
        fixed_window_bits,
    );

    // s_mul_t + U = pk
    ecc_chip.add_unequal(ctx, &s_mul_t, &U, false)
}
