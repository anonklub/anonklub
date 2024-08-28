#![allow(non_snake_case)]
use anyhow::{Context as AnyhowContext, Ok, Result};
use halo2_base::{
    gates::{circuit::builder::BaseCircuitBuilder, RangeChip},
    utils::{BigPrimeField, CurveAffineExt},
};
use halo2_ecc::{
    bigint::ProperCrtUint,
    ecc::{EcPoint, EccChip},
    fields::{fp, FieldChip},
};
use halo2_wasm::Halo2Wasm;
use std::{cell::RefCell, marker::PhantomData, rc::Rc};

use crate::utils::consts::{
    FpChip, FqChip, Point, CONTEXT_PHASE, F, FIXED_WINDOW_BITS, LIMB_BITS, NUM_LIMBS,
};

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

pub struct EfficientECDSACircuit<CF, SF, GA>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    pub instances: Vec<u32>,
    eff_ecdsa_inputs: EfficientECDSAInputs<CF, SF, GA>,
    range_chip: RangeChip<F>,
    builder: Rc<RefCell<BaseCircuitBuilder<F>>>,
    _CF_marker: PhantomData<CF>,
    _SF_marker: PhantomData<SF>,
    _GA_marker: PhantomData<GA>,
}

impl<CF, SF, GA> EfficientECDSACircuit<CF, SF, GA>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    pub fn new(
        halo2_wasm: &Halo2Wasm,
        eff_ecdsa_inputs: EfficientECDSAInputs<CF, SF, GA>,
    ) -> Result<Self> {
        let eff_ecdsa_inputs = EfficientECDSAInputs {
            s: eff_ecdsa_inputs.s,
            T: eff_ecdsa_inputs.T,
            U: eff_ecdsa_inputs.U,
        };

        let circuit_params = halo2_wasm
            .circuit_params
            .clone()
            .context("Error: Circuit params are not set")?;

        let lookup_bits = circuit_params
            .lookup_bits
            .context("Error: Lookup bits are not set in circuit params")?;

        let range_chip = RangeChip::<F>::new(
            lookup_bits,
            halo2_wasm
                .circuit
                .try_borrow()
                .unwrap()
                .lookup_manager()
                .clone(),
        );

        Ok(EfficientECDSACircuit {
            instances: vec![],
            eff_ecdsa_inputs,
            range_chip,
            builder: Rc::clone(&halo2_wasm.circuit),
            _CF_marker: PhantomData,
            _SF_marker: PhantomData,
            _GA_marker: PhantomData,
        })
    }

    // CF
    fn ecc_fp_chip(&self) -> FpChip<F, CF> {
        FpChip::<F, CF>::new(&self.range_chip, LIMB_BITS, NUM_LIMBS)
    }

    // SF
    fn ecc_fq_chip(&self) -> FqChip<F, SF> {
        FqChip::<F, SF>::new(&self.range_chip, LIMB_BITS, NUM_LIMBS)
    }

    fn ecc_chip<'a>(&'a self, fp_chip: &'a fp::FpChip<F, CF>) -> EccChip<'a, F, FpChip<F, CF>> {
        EccChip::new(fp_chip)
    }

    fn load_private(&mut self) -> ProperCrtUint<F> {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        // Get needed chips
        let fq_chip = self.ecc_fq_chip();

        // Assign private inputs
        fq_chip.load_private(ctx, self.eff_ecdsa_inputs.s)
    }

    fn load_instances(&mut self) -> (Point<F, CF>, Point<F, CF>) {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        // Get BaseField chip
        let fp_chip = self.ecc_fp_chip();
        let ecc_chip = self.ecc_chip(&fp_chip);
        let base_chip = ecc_chip.field_chip;

        // Get Points out fo the T and U
        let (T_x, T_y) = self.eff_ecdsa_inputs.T.into_coordinates();
        let (U_x, U_y) = self.eff_ecdsa_inputs.U.into_coordinates();

        // Set as constants in the BaseField chip
        let (T_x, T_y) = (
            base_chip.load_constant(ctx, T_x),
            base_chip.load_constant(ctx, T_y),
        );

        let (U_x, U_y) = (
            base_chip.load_constant(ctx, U_x),
            base_chip.load_constant(ctx, U_y),
        );

        let precompile_ec_points = (
            EcPoint::new(T_x.clone(), T_y.clone()),
            EcPoint::new(U_x.clone(), U_y.clone()),
        );

        self.instances = vec![T_x, T_y, U_x, U_y]
            .iter()
            .map(|instance_point| {
                instance_point
                    .as_ref()
                    .native()
                    .cell
                    .unwrap()
                    .offset
                    .try_into()
                    .unwrap()
            })
            .collect();

        precompile_ec_points
    }

    pub fn recover_pk_efficient(
        &self,
        T: Point<F, CF>,
        U: Point<F, CF>,
        s: ProperCrtUint<F>,
        fixed_window_bits: usize,
    ) -> Point<F, CF> {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        // Get BaseField chip
        let base_chip = self.ecc_fp_chip();
        let scalar_chip = self.ecc_fq_chip();
        let ecc_chip = self.ecc_chip(&base_chip);
        //let base_chip = ecc_chip.field_chip;

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

    pub fn verify_signature(&mut self) -> Result<()> {
        let s = self.load_private();

        // Load T and U as constants in the base field
        let (T, U) = self.load_instances();

        // Recover pk from precomputed T and U.
        self.recover_pk_efficient(T, U, s, FIXED_WINDOW_BITS);

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use anyhow::{anyhow, Ok};
    use anyhow::{Context, Result};
    use ethers::{
        core::k256::{
            ecdsa::SigningKey,
            elliptic_curve::{ScalarPrimitive, SecretKey},
        },
        signers::Wallet,
        utils::hash_message,
    };
    use halo2_base::{
        halo2_proofs::{
            arithmetic::{CurveAffine, Field},
            halo2curves::{bn256::Bn256, ff::PrimeField, group::Curve, secp256k1},
            poly::kzg::commitment::ParamsKZG,
        },
        utils::{biguint_to_fe, fe_to_biguint, modulus, ScalarField},
    };
    use halo2_ecc::fields::FpStrategy;
    use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, CircuitConfig, Halo2Wasm};
    use halo2_wasm_ext::ext::Halo2WasmExt;
    use halo2_wasm_ext::params::serialize_params_to_bytes;
    use halo2_wasm_ext::utils::ct_option_ok_or;
    use num_bigint::BigUint;
    use rand::{rngs::StdRng, SeedableRng};
    use rand_core::OsRng;
    use serde::{Deserialize, Serialize};
    use std::{fs::File, time::Instant};

    use crate::utils::consts::E;
    use crate::utils::recovery::recover_pk_efficient;
    use crate::utils::verify::verify_efficient_ecdsa;

    use super::{EfficientECDSACircuit, EfficientECDSAInputs};

    const K: u32 = 15;
    const PRIV_KEY: u64 = 42;
    const INSTANCE_COL: usize = 0;

    #[derive(Clone, Copy, Debug, Serialize, Deserialize)]
    pub struct CircuitParams {
        strategy: FpStrategy,
        degree: u32,
        num_advice: usize,
        num_lookup_advice: usize,
        num_fixed: usize,
        lookup_bits: usize,
        limb_bits: usize,
        num_limbs: usize,
    }

    pub struct TestInputs {
        r: secp256k1::Fp,
        msg_hash: BigUint,
        is_y_odd: bool,
    }

    fn random_ecdsa_input(
        rng: &mut StdRng,
    ) -> Result<(
        EfficientECDSAInputs<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>,
        TestInputs,
    )> {
        let g = Secp256k1Affine::generator();

        // Generate a key pair
        let sk = <Secp256k1Affine as CurveAffine>::ScalarExt::random(rng.clone());
        let _pk = Secp256k1Affine::from(g * sk);

        // Generate a valid signature
        // Suppose `m_hash` is the message hash
        let msg_hash = <Secp256k1Affine as CurveAffine>::ScalarExt::random(rng.clone());

        // Draw a randomness
        let k = <Secp256k1Affine as CurveAffine>::ScalarExt::random(rng);
        let k_inv = k.invert().unwrap();

        // Calculate `r`
        let r_point = Secp256k1Affine::from(g * k).coordinates().unwrap();
        let x = r_point.x();
        let x_bigint = fe_to_biguint(x);
        let r_Fq = biguint_to_fe::<secp256k1::Fq>(&(x_bigint.clone() % modulus::<secp256k1::Fq>()));
        let r_Fp = biguint_to_fe::<secp256k1::Fp>(&(x_bigint.clone() % modulus::<secp256k1::Fp>()));

        // Calculate `s`
        let s = k_inv * (msg_hash + (r_Fq * sk));

        // Check if y is odd
        let is_y_odd = r_point.y().to_bytes_le();
        let is_y_odd = BigUint::from_bytes_le(&is_y_odd);
        let is_y_odd = is_y_odd.bit(0);

        let msg_hash = BigUint::from_bytes_le(&msg_hash.to_bytes_le());

        // Precompile T and U
        let (U, T) = recover_pk_efficient(msg_hash.clone(), r_Fp, is_y_odd)
            .map_err(|e| anyhow!(e))
            .context("Failed to compute random based efficient ECDSA!")?;

        Ok((
            EfficientECDSAInputs { s, T, U },
            TestInputs {
                r: r_Fp,
                msg_hash,
                is_y_odd,
            },
        ))
    }

    /// @src Spartan
    fn mock_eff_ecdsa_input(
        priv_key: u64,
    ) -> Result<(
        EfficientECDSAInputs<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>,
        TestInputs,
    )> {
        let signing_key = SigningKey::from(SecretKey::new(ScalarPrimitive::from(priv_key)));
        let g = secp256k1::Secp256k1Affine::generator();
        let _pk = (g * secp256k1::Fq::from(priv_key)).to_affine();

        let message = b"harry AnonKlub";
        let msg_hash = hash_message(message);
        let wallet = Wallet::from(signing_key);
        let sig = wallet.sign_hash(msg_hash).unwrap();
        let msg_hash = BigUint::from_bytes_be(&msg_hash.to_fixed_bytes());

        let mut s = [0u8; 32];
        let mut r = [0u8; 32];
        sig.s.to_little_endian(&mut s);
        sig.r.to_little_endian(&mut r);

        let is_y_odd = sig.v == 27;

        let s = ct_option_ok_or(
            secp256k1::Fq::from_repr(s),
            anyhow!("Failed to convert s into Fq."),
        )?;

        let r = ct_option_ok_or(
            secp256k1::Fp::from_repr(r),
            anyhow!("Failed to convert s into Fq."),
        )?;

        let (U, T) = recover_pk_efficient(msg_hash.clone(), r, is_y_odd)
            .map_err(|e| anyhow!(e))
            .context("Failed to compute efficient ECDSA!")?;

        Ok((
            EfficientECDSAInputs { s, T, U },
            TestInputs {
                r,
                msg_hash,
                is_y_odd,
            },
        ))
    }

    #[test]
    fn test_eff_secp256k1_mock_verify() -> Result<()> {
        let path = "configs/ecdsa.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let (ecdsa_inputs, _) = mock_eff_ecdsa_input(PRIV_KEY)
            .map_err(|e| anyhow!(e))
            .context("Failed to compute efficient ECDSA")?;

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit =
            EfficientECDSACircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
                &halo2_wasm,
                ecdsa_inputs,
            )?;

        circuit
            .verify_signature()
            .map_err(|e| anyhow!(e))
            .context("The circuit failed to verify signature!")?;

        halo2_wasm.set_instances(&circuit.instances, INSTANCE_COL);
        halo2_wasm.assign_instances();

        halo2_wasm.mock();

        Ok(())
    }

    #[test]
    fn test_secp256k1_mock_random_verify() -> Result<()> {
        let path = "configs/ecdsa.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let mut rng = StdRng::seed_from_u64(0);
        let (ecdsa_inputs, test_inputs) = random_ecdsa_input(&mut rng)?;

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit =
            EfficientECDSACircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
                &halo2_wasm,
                ecdsa_inputs,
            )?;

        circuit
            .verify_signature()
            .map_err(|e| anyhow!(e))
            .context("The circuit failed to verify signature!")?;

        halo2_wasm.set_instances(&circuit.instances, INSTANCE_COL);

        halo2_wasm.assign_instances();

        halo2_wasm.mock();

        // Get the public instance inputs
        let instances = halo2_wasm.get_instance_values_ext(INSTANCE_COL)?;

        // Verify Eff ECDSA
        println!("Verifying Eff ECDSA Proof");

        let is_eff_ecdsa_valid = verify_efficient_ecdsa(
            test_inputs.msg_hash,
            test_inputs.r,
            test_inputs.is_y_odd,
            &instances,
        )?;

        assert!(is_eff_ecdsa_valid);

        Ok(())
    }

    #[test]
    fn test_eff_secp256k1_real_verify() -> Result<()> {
        let path = "configs/ecdsa.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let (ecdsa_inputs, test_inputs) = mock_eff_ecdsa_input(PRIV_KEY)?;

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit =
            EfficientECDSACircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
                &halo2_wasm,
                ecdsa_inputs,
            )?;

        circuit
            .verify_signature()
            .map_err(|e| anyhow!(e))
            .context("The circuit failed to verify signature!")?;

        halo2_wasm.set_instances(&circuit.instances, INSTANCE_COL);

        halo2_wasm.assign_instances();

        let params = ParamsKZG::<Bn256>::setup(K, OsRng);

        // Load params
        halo2_wasm.load_params(&serialize_params_to_bytes(&params));

        // Generate VK
        halo2_wasm.gen_vk();

        // Generate PK
        halo2_wasm.gen_pk();

        let start = Instant::now();

        // Generate proof
        let proof: Vec<u8> = halo2_wasm.prove();

        // Get the public instance inputs
        let instances = halo2_wasm.get_instance_values_ext(INSTANCE_COL)?;

        // Verify the proof
        println!("Verifying Proof");

        let is_proof_valid = halo2_wasm.verify_ext(&instances, &proof, params)?;

        println!("- Is proof valid? {}", is_proof_valid);

        assert!(is_proof_valid, "The proof is not valid");

        // Verify Eff ECDSA
        println!("Verifying Eff ECDSA Proof");

        let is_eff_ecdsa_valid = verify_efficient_ecdsa(
            test_inputs.msg_hash,
            test_inputs.r,
            test_inputs.is_y_odd,
            &instances,
        )?;

        println!("- Is Eff ECDSA valid? {}", is_eff_ecdsa_valid);

        assert!(is_eff_ecdsa_valid, "Eff ECDSA is not valid");

        let duration = start.elapsed();
        let duration_in_minutes = duration.as_secs_f64() / 60.0;
        println!("Test executed in: {:.2?} seconds", duration);
        println!("Test executed in: {:.2?} minutes", duration_in_minutes);

        Ok(())
    }

    #[test]
    fn test_eff_secp256k1_verify() -> Result<()> {
        let path = "configs/ecdsa.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let (ecdsa_inputs, test_inputs) = mock_eff_ecdsa_input(PRIV_KEY)?;

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit =
            EfficientECDSACircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
                &halo2_wasm,
                ecdsa_inputs,
            )?;

        circuit
            .verify_signature()
            .map_err(|e| anyhow!(e))
            .context("The circuit failed to verify signature!")?;

        let params = ParamsKZG::<E>::setup(K, OsRng);

        // Load params
        halo2_wasm.load_params(&serialize_params_to_bytes(&params));

        // Generate VK
        halo2_wasm.gen_vk();

        // Generate PK
        halo2_wasm.gen_pk();

        // Get the public instance inputs
        let instances = halo2_wasm.get_instance_values_ext(INSTANCE_COL)?;

        let start = Instant::now();

        // Verify Eff ECDSA
        println!("Verifying Eff ECDSA Proof");

        let is_eff_ecdsa_valid = verify_efficient_ecdsa(
            test_inputs.msg_hash,
            test_inputs.r,
            test_inputs.is_y_odd,
            &instances,
        )?;

        println!("- Is Eff ECDSA valid? {}", is_eff_ecdsa_valid);

        assert!(is_eff_ecdsa_valid, "Eff ECDSA is not valid");

        let duration = start.elapsed();
        let duration_in_minutes = duration.as_secs_f64() / 60.0;
        println!("Test executed in: {:.2?} seconds", duration);
        println!("Test executed in: {:.2?} minutes", duration_in_minutes);

        Ok(())
    }
}
