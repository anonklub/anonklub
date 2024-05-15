use halo2_base::{
    gates::{circuit::builder::BaseCircuitBuilder, RangeChip},
    halo2_proofs::halo2curves::{
        bn256::Fr as Bn254Fr,
        secp256k1::{Fp as Secp256k1Fp, Fq as Secp256k1Fq, Secp256k1Affine},
    },
    utils::BigPrimeField,
};
use halo2_ecc::{
    ecc::{ecdsa::ecdsa_verify_no_pubkey_check, EccChip},
    fields::{fp::FpChip, FieldChip},
    secp256k1::{FpChip as Secp256k1FpChip, FqChip as Secp256k1FqChip},
};
use halo2_wasm::Halo2Wasm;
use std::{cell::RefCell, rc::Rc};
use wasm_bindgen::prelude::wasm_bindgen;

#[derive(Debug)]
pub struct ECDSAInputs {
    r: Secp256k1Fq,
    s: Secp256k1Fq,
    msg_hash: Secp256k1Fq,
    pk: Secp256k1Affine,
}

#[wasm_bindgen]
pub struct Secp256k1VerifyCircuit {
    ecdsa_inputs: ECDSAInputs,
    range_chip: RangeChip<Bn254Fr>,
    builder: Rc<RefCell<BaseCircuitBuilder<Bn254Fr>>>,
}

impl Secp256k1VerifyCircuit {
    pub fn new(halo2_wasm: &Halo2Wasm, ecdsa_inputs: ECDSAInputs) -> Result<Self, String> {
        let ecdsa_inputs = ECDSAInputs {
            r: ecdsa_inputs.r,
            s: ecdsa_inputs.s,
            msg_hash: ecdsa_inputs.msg_hash,
            pk: ecdsa_inputs.pk,
        };

        let circuit_params = halo2_wasm
            .circuit_params
            .clone()
            .ok_or("Error: Circuit params are not set")?;

        let lookup_bits = circuit_params
            .lookup_bits
            .ok_or("Error: Lookup bits are not set in circuit params")?;

        let range = RangeChip::new(
            lookup_bits,
            halo2_wasm.circuit.borrow().lookup_manager().clone(),
        );

        Ok(Secp256k1VerifyCircuit {
            ecdsa_inputs,
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

    #[allow(clippy::extra_unused_type_parameters)]
    fn ecc_chip<'a, Fp: BigPrimeField>(
        &'a self,
        fp_chip: &'a FpChip<Bn254Fr, Secp256k1Fp>, // TODO that could be generalized in the future
    ) -> EccChip<'a, Bn254Fr, FpChip<Bn254Fr, Secp256k1Fp>> {
        EccChip::new(fp_chip)
    }

    pub fn verify_signature(&mut self) -> Result<(), String> {
        let var_window_bits = 4;
        let fixed_window_bits = 4;

        // Deserialize the inputs
        // let s = Secp256k1Fq::from(vec_to_u64(self.ecdsa_inputs.s.clone()));
        // let r = Secp256k1Fq::from(vec_to_u64(self.ecdsa_inputs.r.clone()));
        // let msg_hash = Secp256k1Fq::from(vec_to_u64(self.ecdsa_inputs.msg_hash.clone()));

        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(0); //TODO why 0?

        // Get needed chips
        let fq_chip = self.secp256k1_fq_chip();
        let fp_chip = self.secp256k1_fp_chip();
        let ecc_chip = self.ecc_chip::<Bn254Fr>(&fp_chip);

        // Assign private inputs
        let [r, s, msg_hash] = [
            self.ecdsa_inputs.r,
            self.ecdsa_inputs.s,
            self.ecdsa_inputs.msg_hash,
        ]
        .map(|x| fq_chip.load_private(ctx, x));
        let pk =
            ecc_chip.load_private_unchecked(ctx, (self.ecdsa_inputs.pk.x, self.ecdsa_inputs.pk.y));

        // Verify ECDSA Signature
        let _verification_result =
            ecdsa_verify_no_pubkey_check::<Bn254Fr, Secp256k1Fp, Secp256k1Fq, Secp256k1Affine>(
                &ecc_chip,
                ctx,
                pk,
                r,
                s,
                msg_hash,
                var_window_bits,
                fixed_window_bits,
            );

        #[cfg(feature = "display")]
        if self.r.is_some() {
            let result = *_verification_result.value();
            println!("ECDSA res {result:?}");

            ctx.print_stats(&["Range"]);
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::{ECDSAInputs, Secp256k1VerifyCircuit};
    use halo2_base::{
        halo2_proofs::{
            arithmetic::{CurveAffine, Field},
            halo2curves::{bn256::Bn256, secp256k1::Fq},
            poly::{commitment::Params, kzg::commitment::ParamsKZG},
        },
        utils::{biguint_to_fe, fe_to_biguint, modulus},
    };
    use halo2_ecc::fields::FpStrategy;
    use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, CircuitConfig, Halo2Wasm};
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

    fn random_ecdsa_input(rng: &mut StdRng) -> ECDSAInputs {
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

        ECDSAInputs { r, s, msg_hash, pk }
    }

    #[test]
    fn test_secp256k1_mock_verify() -> Result<(), String> {
        let path = "configs/secp256k1_ecdsa_circuit.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path).unwrap_or_else(|e| panic!("{path} does not exist: {e:?}")),
        )
        .map_err(|e| e.to_string())?;

        let mut rng = StdRng::seed_from_u64(0);
        let ecdsa_inputs = random_ecdsa_input(&mut rng);

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit = Secp256k1VerifyCircuit::new(&halo2_wasm, ecdsa_inputs)?;

        circuit.verify_signature()?;

        halo2_wasm.mock();
        Ok(())
    }

    #[test]
    fn test_secp256k1_real_verify() -> Result<(), String> {
        let path = "configs/secp256k1_ecdsa_circuit.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path).unwrap_or_else(|e| panic!("{path} does not exist: {e:?}")),
        )
        .map_err(|e| e.to_string())?;

        let mut rng = StdRng::seed_from_u64(0);
        let ecdsa_inputs = random_ecdsa_input(&mut rng);

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
