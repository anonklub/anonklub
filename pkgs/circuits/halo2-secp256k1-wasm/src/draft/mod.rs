/// This crate is drafted, it was a trail for using `Halo2_wasm::ECC` crate
use std::{cell::RefCell, f64::consts::E, marker::PhantomData, sync::Arc};

use halo2_base::{
    gates::{circuit::builder::BaseCircuitBuilder, GateChip},
    halo2_proofs::{
        arithmetic::CurveAffine,
        circuit::{Layouter, SimpleFloorPlanner},
        halo2curves::{ed25519::Fr, ff::PrimeField, pasta::pallas::Base},
        plonk::{Circuit, ConstraintSystem, Error},
    },
};

use halo2_wasm::{
    halo2lib::{
        ecc::{Bn254Fr, JsCircuitValue256, Secp256k1Affine, Secp256k1AffinePoint},
        Halo2LibWasm,
    },
    Halo2Wasm,
};
use wasm_bindgen::convert::OptionIntoWasmAbi;

#[derive(Clone, Debug)]
pub struct ECDSAInputs {
    pub r: JsCircuitValue256,
    pub s: JsCircuitValue256,
    pub msg_hash: JsCircuitValue256,
    pub pub_key: Secp256k1AffinePoint,
}

pub struct Secp256k1VerifyCircuit {
    pub ecdsa_inputs: ECDSAInputs,
    pub halo2_lib_wasm: Halo2LibWasm,
}

impl Secp256k1VerifyCircuit {
    pub fn new(halo2_wasm: &Halo2Wasm, ecdsa_inputs: ECDSAInputs) -> Self {
        let ecdsa_inputs = ECDSAInputs {
            r: ecdsa_inputs.r,
            s: ecdsa_inputs.s,
            msg_hash: ecdsa_inputs.msg_hash,
            pub_key: ecdsa_inputs.pub_key,
        };

        Secp256k1VerifyCircuit {
            ecdsa_inputs,
            halo2_lib_wasm: Halo2LibWasm::new(halo2_wasm),
        }
    }

    pub fn verify(&mut self) {
        self.halo2_lib_wasm.to_hi_lo(a);
        let ecdsa_verification = self.halo2_lib_wasm.verify_secp256k1_ecdsa_signature(
            self.ecdsa_inputs.pub_key.clone(),
            self.ecdsa_inputs.r.clone(),
            self.ecdsa_inputs.s.clone(),
            self.ecdsa_inputs.msg_hash.clone(),
        );
        #[cfg(feature = "display")]
        if self.r.is_some() {
            println!("ECDSA res {ecdsa:?}");

            ctx.print_stats(&["Range"]);
        }
    }
}

#[cfg(test)]
mod tests {
    use std::fs::File;

    use halo2_base::{
        gates::circuit::BaseCircuitParams,
        halo2_proofs::{
            arithmetic::{CurveAffine, Field},
            halo2curves::{
                bn256::Fr,
                secp256k1::{Fp, Fq},
            },
        },
        utils::{bigint_to_fe, biguint_to_fe, fe_to_bigint, fe_to_biguint, modulus},
    };
    use halo2_ecc::{bigint::ProperCrtUint, fields::FpStrategy};
    use halo2_wasm::{
        halo2lib::ecc::{Secp256k1Affine, Secp256k1FqPoint},
        Halo2Wasm,
    };
    use rand::{rngs::StdRng, SeedableRng};
    use rand_core::OsRng;
    use serde::{Deserialize, Serialize};

    use super::{ECDSAInputs, Secp256k1VerifyCircuit};

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

    fn random_ecdsa_input(rng: &mut StdRng) {
        let G = Secp256k1Affine::generator();

        // Generate a key pair
        let sk = <Secp256k1Affine as CurveAffine>::ScalarExt::random(rng.clone());
        let pub_key = Secp256k1Affine::from(G * sk);

        // Generate a valid signature
        // Suppose `m_hash` is the message hash
        let msg_hash = <Secp256k1Affine as CurveAffine>::ScalarExt::random(rng.clone());

        // Draw a randomness
        let k = <Secp256k1Affine as CurveAffine>::ScalarExt::random(rng);
        let k_inv = k.invert().unwrap();

        // Calculate `r`
<<<<<<< HEAD
        let r_point = Secp256k1Affine::from(G * k).coordinates().unwrap();
=======
        let r_point = Secp256k1Affine::from(G * k)
            .coordinates()
            .unwrap();
>>>>>>> 49a75ad (feat: halo2lib secp256k1 recover pk)
        let x = r_point.x();
        let x_bigint = fe_to_biguint(x);
        let r = biguint_to_fe::<Fq>(&(x_bigint % modulus::<Fq>()));

        // Calculate `s`
        let s = k_inv * (msg_hash + (r * sk));

        // Convert to JS va
    }

    #[test]
    fn test_secp256k1_verify() {
        let path = "configs/ecdsa_circuit.config";
        let params: CircuitParams = serde_json::from_reader(
            File::open(path).unwrap_or_else(|e| panic!("{path} does not exist: {e:?}")),
        )
        .unwrap();
        let K = params.degree;

        let mut rng = StdRng::seed_from_u64(0);
        let ecdsa_inputs = random_ecdsa_input(&mut rng);

        let halo2_wasm = Halo2Wasm::new();

        //let circuit = Secp256k1VerifyCircuit::new(&halo2_wasm, ecdsa_inputs);
    }
}
