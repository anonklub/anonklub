use std::marker::PhantomData;

use halo2_proofs::{
    arithmetic::CurveAffine,
    circuit::Value,
    dev::{CircuitLayout, MockProver},
    halo2curves::ff::PrimeField,
    plonk::{keygen_pk, keygen_vk, permutation::VerifyingKey, ProvingKey},
    poly::commitment::{Params, ParamsProver},
};
use halo2wrong::curves::{ff::FromUniformBytes, pasta::Fp, secp256k1::Secp256k1Affine};
use maingate::mock_prover_verify;
use plotters::{backend::BitMapBackend, drawing::IntoDrawingArea, style::WHITE};

use crate::circuit::EcdsaVerifyCircuit;

trait EcdsaVerifyCircuitUtils<E, N>
where
    E: CurveAffine,
    N: PrimeField,
{
    // Generates an empty circuit. Useful for generating the proving/verifying keys.
    fn empty_circuit(aux_generator: E, window_size: usize) -> Self;

    // Creates a circuit from public key, signature, and message hash
    fn create_circuit(
        public_key: E,
        signature: (E::Scalar, E::Scalar),
        msg_hash: E::Scalar,
        aux_generator: E,
        window_size: usize,
    ) -> Self;

    // Draws the layout of the circuit. It is useful for debugging.
    fn draw_circuit(k: u32, circuit: &Self);

    // Runs the mock prover and prints any errors
    fn run_mock_prover(circuit: &Self, pub_input: &Vec<Vec<N>>);
}

impl<E, N> EcdsaVerifyCircuitUtils<E, N> for EcdsaVerifyCircuit<E, N>
where
    E: CurveAffine,
    N: PrimeField + FromUniformBytes<64> + Ord,
{
    // Generates an empty circuit. Useful for generating the proving/verifying keys.
    fn empty_circuit(aux_generator: E, window_size: usize) -> Self {
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
    fn create_circuit(
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
    fn draw_circuit(k: u32, circuit: &Self) {
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

    // Runs the mock prover and prints any errors
    fn run_mock_prover(circuit: &Self, pub_input: &Vec<Vec<N>>) {
        mock_prover_verify(circuit, pub_input.to_vec())
    }
}

trait EcdsaVerifyCircuitSecp256k1 {
    type param: ParamsProver<Secp256k1Affine>;
    // Defines the function for generating setup parameters specific to Secp256k1Affine
    fn generate_setup_params(k: u32) -> Self::param;

    // Defines the function for generating the verifying and proving keys specific to Secp256k1Affine
    fn generate_keys(circuit: &Self) -> (ProvingKey<Secp256k1Affine>, VerifyingKey<Secp256k1Affine>);
}

impl EcdsaVerifyCircuitSecp256k1 for EcdsaVerifyCircuit<Secp256k1Affine, Fp> {
    fn generate_setup_params(k: u32) ->  Self::ParamsType {
        Params::<Secp256k1Affine>::new(k)
    }

    fn generate_keys(circuit: &Self) -> (ProvingKey<Secp256k1Affine>, VerifyingKey<Secp256k1Affine>) {
        let params = Self::generate_setup_params(k); // Assuming `k` is available or passed differently
        let vk = keygen_vk(&params, circuit).expect("vk should not fail");
        let pk = keygen_pk(&params, vk.clone(), circuit).expect("pk should not fail");
        (pk, vk)
    }
}
