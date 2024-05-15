#![allow(non_snake_case)]
use anyhow::{Context, Result};
use halo2_base::{
    gates::{circuit::builder::BaseCircuitBuilder, RangeChip},
    halo2_proofs::halo2curves::{
        bn256::Fr as Bn254Fr,
        secp256k1::{Fp as Secp256k1Fp, Fq as Secp256k1Fq, Secp256k1Affine},
    },
    utils::{BigPrimeField, CurveAffineExt},
    Context as Halo2Context,
};
use halo2_ecc::{
    bigint::ProperCrtUint,
    ecc::{EcPoint, EccChip},
    fields::{fp::FpChip, FieldChip},
    secp256k1::{FpChip as Secp256k1FpChip, FqChip as Secp256k1FqChip},
};
use halo2_wasm::Halo2Wasm;
use std::{cell::RefCell, rc::Rc};
use wasm_bindgen::prelude::wasm_bindgen;

#[derive(Debug)]
pub struct EffECDSAInputs {
    s: Secp256k1Fq,
    pk: Secp256k1Affine,
    T: Secp256k1Affine,
    U: Secp256k1Affine,
}

#[wasm_bindgen]
pub struct Secp256k1VerifyCircuit {
    eff_ecdsa_inputs: EffECDSAInputs,
    range_chip: RangeChip<Bn254Fr>,
    builder: Rc<RefCell<BaseCircuitBuilder<Bn254Fr>>>,
}

impl Secp256k1VerifyCircuit {
    pub fn new(halo2_wasm: &Halo2Wasm, ecdsa_inputs: EffECDSAInputs) -> Result<Self> {
        let ecdsa_inputs = EffECDSAInputs {
            s: ecdsa_inputs.s,
            pk: ecdsa_inputs.pk,
            T: ecdsa_inputs.T,
            U: ecdsa_inputs.U,
        };

        let circuit_params = halo2_wasm
            .circuit_params
            .clone()
            .context("Error: Circuit params are not set")?;

        let lookup_bits = circuit_params
            .lookup_bits
            .context("Error: Lookup bits are not set in circuit params")?;

        let range = RangeChip::new(
            lookup_bits,
            halo2_wasm.circuit.borrow().lookup_manager().clone(),
        );

        Ok(Secp256k1VerifyCircuit {
            eff_ecdsa_inputs: ecdsa_inputs,
            range_chip: range,
            builder: Rc::clone(&halo2_wasm.circuit),
        })
    }

    fn secp256k1_fp_chip(&self) -> Secp256k1FpChip<Bn254Fr> {
        let limb_bits = 88;
        let num_limbs = 3;
        Secp256k1FpChip::<Bn254Fr>::new(&self.range_chip, limb_bits, num_limbs)
    }
    fn secp256k1_fq_chip(&self) -> Secp256k1FqChip<Bn254Fr> {
        let limb_bits = 88;
        let num_limbs = 3;
        Secp256k1FqChip::<Bn254Fr>::new(&self.range_chip, limb_bits, num_limbs)
    }

    fn ecc_chip<'a, Fp: BigPrimeField>(
        &'a self,
        fp_chip: &'a FpChip<Bn254Fr, Secp256k1Fp>, // TODO that could be generalized in the future
    ) -> EccChip<'a, Bn254Fr, FpChip<Bn254Fr, Secp256k1Fp>> {
        EccChip::new(fp_chip)
    }

    fn recover_pk_eff<F, CF, SF, GA>(
        &self,
        ecc_chip: &EccChip<F, FpChip<F, CF>>,
        ctx: &mut Halo2Context<F>,
        T: EcPoint<F, <FpChip<F, CF> as FieldChip<F>>::FieldPoint>,
        U: EcPoint<F, <FpChip<F, CF> as FieldChip<F>>::FieldPoint>,
        s: ProperCrtUint<F>,
        fixed_window_bits: usize,
    ) -> EcPoint<F, <FpChip<F, CF> as FieldChip<F>>::FieldPoint>
    where
        F: BigPrimeField,
        CF: BigPrimeField,
        SF: BigPrimeField,
        GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
    {
        // Following https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm
        let base_chip = ecc_chip.field_chip;
        let scalar_chip =
            FpChip::<F, SF>::new(base_chip.range, base_chip.limb_bits, base_chip.num_limbs);

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
        let recovered_pk = ecc_chip.add_unequal(ctx, &s_mul_t, &U, false);

        recovered_pk
    }

    pub fn verify_signature(&mut self) -> Result<()> {
        let fixed_window_bits = 4;

        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(0); //TODO why 0?

        // Get needed chips
        let fq_chip = self.secp256k1_fq_chip();
        let fp_chip = self.secp256k1_fp_chip();
        let ecc_chip = self.ecc_chip::<Bn254Fr>(&fp_chip);

        // Assign private inputs
        let s = fq_chip.load_private(ctx, self.eff_ecdsa_inputs.s);
        let pk = ecc_chip.load_private_unchecked(
            ctx,
            (self.eff_ecdsa_inputs.pk.x, self.eff_ecdsa_inputs.pk.y),
        );
        // TODO: I think no need to do load private for T and U
        let T = ecc_chip
            .load_private_unchecked(ctx, (self.eff_ecdsa_inputs.T.x, self.eff_ecdsa_inputs.T.y));
        let U = ecc_chip
            .load_private_unchecked(ctx, (self.eff_ecdsa_inputs.U.x, self.eff_ecdsa_inputs.U.y));

        // Recover pk from precomputed T and U.
        let recovered_pk = self
            .recover_pk_eff::<Bn254Fr, Secp256k1Fp, Secp256k1Fq, Secp256k1Affine>(
                &ecc_chip,
                ctx,
                T,
                U,
                s,
                fixed_window_bits,
            );

        // Check pk equals recovered_pk
        ecc_chip.assert_equal(ctx, pk, recovered_pk);

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::{EffECDSAInputs, Secp256k1VerifyCircuit};
    use crate::{recovery::recover_pk_eff, utils::ct_option_ok_or};
    use anyhow::anyhow;
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
            halo2curves::{
                bn256::Bn256,
                ff::PrimeField,
                group::Curve,
                secp256k1::{self, Fq},
            },
            poly::{commitment::Params, kzg::commitment::ParamsKZG},
        },
        utils::{biguint_to_fe, fe_to_biguint, modulus, ScalarField},
    };
    use halo2_ecc::fields::FpStrategy;
    use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, CircuitConfig, Halo2Wasm};
    use num_bigint::BigUint;
    use rand::{rngs::StdRng, SeedableRng};
    use rand_core::OsRng;
    use serde::{Deserialize, Serialize};
    use std::{fs::File, io::Cursor, time::Instant};

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

    fn serialize_params_to_bytes(params: &ParamsKZG<Bn256>) -> Vec<u8> {
        let mut buf = Vec::new();
        let mut cursor = Cursor::new(&mut buf);

        // Hypothetical write method, replace with the actual method to serialize ParamsKZG<Bn256>
        params.write(&mut cursor).expect("Serialization failed");

        buf
    }

    fn random_ecdsa_input(rng: &mut StdRng) -> Result<EffECDSAInputs> {
        let g = Secp256k1Affine::generator();

        // Generate a key pair
        let sk = <Secp256k1Affine as CurveAffine>::ScalarExt::random(rng.clone());
        let pk = Secp256k1Affine::from(g * sk);

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
        let r = biguint_to_fe::<Fq>(&(x_bigint % modulus::<Fq>()));

        // Calculate `s`
        let s = k_inv * (msg_hash + (r * sk));

        // Check if y is odd
        let is_y_odd = r_point.y().to_bytes_le();
        let is_y_odd = BigUint::from_bytes_le(&is_y_odd);
        let is_y_odd = is_y_odd.bit(0);

        let msg_hash = BigUint::from_bytes_le(&msg_hash.to_bytes_le());

        // Precompile T and U
        let (U, T) = recover_pk_eff(msg_hash.clone(), r, is_y_odd)
            .map_err(|e| anyhow!(e))
            .context("Failed to compute random based efficient ECDSA!")?;

        Ok(EffECDSAInputs { s, pk, T, U })
    }

    /// @src Spartan
    fn mock_eff_ecdsa_input(priv_key: u64) -> Result<EffECDSAInputs> {
        let signing_key = SigningKey::from(SecretKey::new(ScalarPrimitive::from(priv_key)));
        let g = secp256k1::Secp256k1Affine::generator();
        let pk = (g * secp256k1::Fq::from(priv_key)).to_affine();

        let message = b"harry AnonKlub";
        let msg_hash = hash_message(message);
        let msg_hash_bigint = BigUint::from_bytes_be(&msg_hash.to_fixed_bytes());
        let wallet = Wallet::from(signing_key);
        let sig = wallet.sign_hash(msg_hash).unwrap();

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
            secp256k1::Fq::from_repr(r),
            anyhow!("Failed to convert s into Fq."),
        )?;

        let (U, T) = recover_pk_eff(msg_hash_bigint.clone(), r, is_y_odd)
            .map_err(|e| anyhow!(e))
            .context("Failed to compute efficient ECDSA!")?;

        Ok(EffECDSAInputs { s, pk, T, U })
    }

    #[test]
    fn test_eff_secp256k1_mock_verify() -> Result<()> {
        let path = "configs/secp256k1_ecdsa_circuit.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let mock_eff_ecdsa = mock_eff_ecdsa_input(42)
            .map_err(|e| anyhow!(e))
            .context("Failed to compute efficient ECDSA")?;

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit = Secp256k1VerifyCircuit::new(&halo2_wasm, mock_eff_ecdsa)?;

        circuit.verify_signature()?;

        halo2_wasm.mock();
        Ok(())
    }

    #[test]
    fn test_secp256k1_mock_random_verify() -> Result<()> {
        let path = "configs/secp256k1_ecdsa_circuit.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let mut rng = StdRng::seed_from_u64(0);
        let ecdsa_inputs = random_ecdsa_input(&mut rng)?;

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit = Secp256k1VerifyCircuit::new(&halo2_wasm, ecdsa_inputs)?;

        circuit.verify_signature()?;

        halo2_wasm.mock();
        Ok(())
    }

    #[test]
    fn test_eff_secp256k1_real_verify() -> Result<()> {
        let path = "configs/secp256k1_ecdsa_circuit.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let ecdsa_inputs = mock_eff_ecdsa_input(42)?;

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit = Secp256k1VerifyCircuit::new(&halo2_wasm, ecdsa_inputs)?;

        circuit.verify_signature()?;

        let params = ParamsKZG::<Bn256>::setup(15, OsRng);

        // Load params
        println!("Load KZG params");
        halo2_wasm.load_params(&serialize_params_to_bytes(&params));

        // Generate VK
        println!("Generating Verification Key");
        halo2_wasm.gen_vk();

        // Generate PK
        println!("Generating Proving Key from Verification Key");
        halo2_wasm.gen_pk();

        let start = Instant::now();

        // Generate proof
        println!("Generating Proof!");
        let proof = halo2_wasm.prove();

        // // Verify the proof
        // println!("Verifying Proof");
        // halo2_wasm.verify(&proof);

        println!("Full generated Proof: {}", hex::encode(proof));

        let duration = start.elapsed();
        let duration_in_minutes = duration.as_secs_f64() / 60.0;
        println!("Test executed in: {:.2?} seconds", duration);
        println!("Test executed in: {:.2?} minutes", duration_in_minutes);

        Ok(())
    }
}
