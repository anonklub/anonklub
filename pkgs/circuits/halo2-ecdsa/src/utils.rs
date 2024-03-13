use std::marker::PhantomData;

use halo2_proofs::{
    arithmetic::CurveAffine,
    circuit::Value,
    dev::CircuitLayout,
    halo2curves::ff::PrimeField,
    plonk::{keygen_pk, permutation::VerifyingKey, ProvingKey},
    poly::commitment::Params,
};
use plotters::{backend::BitMapBackend, drawing::IntoDrawingArea, style::WHITE};

use crate::circuit::EcdsaVerifyCircuit;

impl<E, N> EcdsaVerifyCircuit<E, N> where E: CurveAffine, N: PrimeField {
    // Generates an empty circuit. Useful for generating the proving/verifying keys.
    pub fn empty_circuit(aux_generator: E, window_size: usize) -> Self {
        Self {
            public_key: Value::unknown(),
            signature: Value::unknown(),
            msg_hash: Value::unknown(),
            aux_generator,
            window_size,
            _marker: PhantomData,
        }
    }

    // Creates a circuit from public key, signature, and message hash
    pub fn create_circuit(
        public_key: E,
        signature: (E::Scalar, E::Scalar),
        msg_hash: E::Scalar,
        aux_generator: E,
        window_size: usize,
    ) -> Self {
        Self {
            public_key: Value::known(public_key),
            signature: Value::known(signature),
            msg_hash: Value::known(msg_hash),
            aux_generator,
            window_size,
            _marker: PhantomData,
        }
    }

    // Draws the layout of the circuit. It is useful for debugging.
    pub fn draw_circuit(k: u32, circuit: &Self) {
        let base = BitMapBackend::new("layout.png", (1600, 1600)).into_drawing_area();
        base.fill(&WHITE).unwrap();
        let base = base
            .titled("ECDSA Verification Circuit", ("sans-serif", 24))
            .unwrap();

        CircuitLayout::default()
            .show_equality_constraints(true)
            .render(k, circuit, &base)
            .unwrap();
    }

    // Generates setup parameters using k, which is the number of rows of the circuit
    // can fit in and must be a power of two
    pub fn generate_setup_params(k: u32) -> Params<E> {
        Params::<E>::new(k)
    }

    // Generates the verifying and proving keys. We can pass in an empty circuit to generate these
    pub fn generate_keys(params: &Params<E>, circuit: &self) -> (ProvingKey<E>, VerifyingKey<E>) {
        // just to emphasize that for vk, pk we don't need to know the value of `x`
        let vk = keygen_pk(params, circuit).expect("vk should not fail");
        let pk = keygen_pk(params, vk.clone(), circuit).expect("pk should not fail");
        (pk, vk)
    }
}
