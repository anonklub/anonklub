use std::marker::PhantomData;

use ecc::halo2::circuit::Layouter;
use ecc::halo2::plonk::ConstraintSystem;
use ecc::maingate::RegionCtx;
use ecc::{AssignedPoint, EccConfig, GeneralEccChip};
use halo2::arithmetic::CurveAffine;
use halo2::circuit::{SimpleFloorPlanner, Value};
use halo2::plonk::{Circuit, Error};
use halo2wrong::curves::ff::PrimeField;
use integer::{AssignedInteger, IntegerChip, IntegerConfig, Range,};
use maingate::{MainGate, MainGateConfig, RangeChip, RangeConfig};

use crate::ecdsa::{AssignedEcdsaSig, AssignedPublicKey, EcdsaChip};

const BIT_LEN_LIMB: usize = 68;
const NUMBER_OF_LIMBS: usize = 4;

#[derive(Clone, Debug)]
struct EcdsaVerifyCircuitConfig {
    main_gate_config: MainGateConfig,
    range_config: RangeConfig,
}

impl EcdsaVerifyCircuitConfig {
    pub fn new<C: CurveAffine, N: PrimeField>(meta: &mut ConstraintSystem<N>) -> Self {
        let (rns_base, rns_scalar) = GeneralEccChip::<C, N, NUMBER_OF_LIMBS, BIT_LEN_LIMB>::rns();
        let main_gate_config = MainGate::<N>::configure(meta);
        let mut overflow_bit_lens: Vec<usize> = vec![];
        overflow_bit_lens.extend(rns_base.overflow_lengths());
        overflow_bit_lens.extend(rns_scalar.overflow_lengths());
        let composition_bit_lens = vec![BIT_LEN_LIMB / NUMBER_OF_LIMBS];

        let range_config = RangeChip::<N>::configure(
            meta,
            &main_gate_config,
            composition_bit_lens,
            overflow_bit_lens,
        );

        EcdsaVerifyCircuitConfig {
            main_gate_config,
            range_config,
        }
    }

    pub fn ecc_chip_config(&self) -> EccConfig {
        EccConfig::new(self.range_config.clone(), self.main_gate_config.clone())
    }

    pub fn config_range<N: PrimeField>(
        &self,
        layouter: &mut impl Layouter<N>,
    ) -> Result<(), Error> {
        let range_chip = RangeChip::<N>::new(self.range_config.clone());
        range_chip.load_table(layouter)?;

        Ok(())
    }
}

#[derive(Default, Clone)]
struct EcdsaVerifyCircuit<E: CurveAffine, N: PrimeField> {
    public_key: Value<E>,
    signature: Value<(E::Scalar, E::Scalar)>,
    msg_hash: Value<E::Scalar>,

    aux_generator: E,
    window_size: usize,
    _marker: PhantomData<N>,
}

impl<E: CurveAffine, N: PrimeField> Circuit<N> for EcdsaVerifyCircuit<E, N> {
    type Config = EcdsaVerifyCircuitConfig;
    type FloorPlanner = SimpleFloorPlanner;
    #[cfg(feature = "circuit-params")]
    type Params = ();

    fn without_witnesses(&self) -> Self {
        Self::default()
    }

    fn configure(meta: &mut ConstraintSystem<N>) -> Self::Config {
        EcdsaVerifyCircuitConfig::new::<E, N>(meta)
    }

    fn synthesize(
        &self,
        config: Self::Config,
        mut layouter: impl Layouter<N>,
    ) -> Result<(), ecc::halo2::plonk::Error> {
        let mut ecc_chip =
            GeneralEccChip::<E, N, NUMBER_OF_LIMBS, BIT_LEN_LIMB>::new(config.ecc_chip_config());

        layouter.assign_region(
            || "assign aux values",
            |region| {
                let offset = 0;
                let ctx = &mut RegionCtx::new(region, offset);

                ecc_chip.assign_aux_generator(ctx, Value::known(self.aux_generator))?;
                ecc_chip.assign_aux(ctx, self.window_size, 2)?;
                Ok(())
            },
        );

        let ecdsa_chip = EcdsaChip::new(ecc_chip.clone());
        let scalar_chip = ecc_chip.scalar_field_chip();

        layouter.assign_region(
            || "assign ecdsa verification",
            |region| {
                let offset = 0;
                let ctx = &mut RegionCtx::new(region, offset);

                let r = self.signature.map(|signature| signature.0);
                let s = self.signature.map(|signature| signature.1);

                let integer_r = ecc_chip.new_unassigned_scalar(r);
                let integer_s = ecc_chip.new_unassigned_scalar(s);
                let msg_hash = ecc_chip.new_unassigned_scalar(self.msg_hash);

                let r_assigned = scalar_chip.assign_integer(ctx, integer_r, Range::Remainder)?;
                let s_assigned = scalar_chip.assign_integer(ctx, integer_s, Range::Remainder)?;

                let sig = AssignedEcdsaSig {
                    r: r_assigned,
                    s: s_assigned,
                };

                let pk_in_circuit = ecc_chip.assign_point(ctx, self.public_key)?;
                let pk_assigned = AssignedPublicKey {
                    point: pk_in_circuit,
                };
                let msg_hash = scalar_chip.assign_integer(ctx, msg_hash, Range::Remainder)?;
                ecdsa_chip.verify(ctx, &sig, &pk_assigned, &msg_hash)
            },
        )?;

        config.config_range(&mut layouter)?;

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use halo2::{arithmetic::CurveAffine, halo2curves::ff::FromUniformBytes};
    use maingate::{big_to_fe, fe_to_big};
    use rand_core::OsRng;

    #[test]
    fn test_ecdsa_verifier() {
        fn mod_n<C: CurveAffine>(x: C::Base) -> C::Scalar {
            let x_big = fe_to_big(x);
            big_to_fe(x_big)
        }

        fn run<C: CurveAffine, N: FromUniformBytes<64> + Ord>() {
            let g = C::generator();

            // Generate a key pair
            let sk = <C as CurveAffine>::ScalarExt::random(OsRng);
            let public_key = (g * sk).to_affine();

            // Generate a valid signature
            // Suppose `m_hash` is the message hash
            let msg_hash = <C as CurveAffine>::ScalarExt::random(OsRng);

            // Draw a randomness
            let k = <C as CurveAffine>::ScalarExt::random(OsRng);
            let k_inv = k.invert().unwrap();
        }
    }
}
