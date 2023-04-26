use clap::Parser;
use halo2_base::{
    gates::{GateChip, RangeInstructions},
    gates::{GateInstructions, RangeChip},
    utils::ScalarField,
    AssignedValue, Context, QuantumCell,
    QuantumCell::Witness,
};
use halo2_scaffold::scaffold::{cmd::Cli, run};
use poseidon::PoseidonChip;
use serde::{Deserialize, Serialize};
use std::env::var;

const T: usize = 3;
const RATE: usize = 2;
const R_F: usize = 8;
const R_P: usize = 57;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct CircuitInput {
    pub inputs: [String; 3], // 3 field elements, but as strings for easier deserialization
}

// Hashes two values together either left to right or right to left
fn hash_two<F: ScalarField>(
    ctx: &mut Context<F>,
    inp: CircuitInput,
    make_public: &mut Vec<AssignedValue<F>>,
) {
    // Load variables as private inputs
    let [a, b, switch] =
        inp.inputs.map(|vars| ctx.load_witness(F::from_str_vartime(&vars).unwrap()));
    let gate = GateChip::<F>::default();

    gate.assert_bit(ctx, switch);
    let [a, b] = dual_mux(&gate, ctx, a, b, switch);

    let mut poseidon = PoseidonChip::<F, T, RATE>::new(ctx, R_F, R_P).unwrap();
    poseidon.update(&[a, b]);
    let hash = poseidon.squeeze(ctx, &gate).unwrap();
    make_public.push(hash);

    // TODO: test that the output is the same as circom
    println!("a: {:?}, b: {:?}, poseidon(a,b)): {:?}", a.value(), b.value(), hash.value());
}

fn dual_mux<F: ScalarField>(
    gate: &GateChip<F>,
    ctx: &mut Context<F>,
    a: impl Into<QuantumCell<F>>,
    b: impl Into<QuantumCell<F>>,
    switch: impl Into<QuantumCell<F>>,
) -> [AssignedValue<F>; 2] {
    let a = a.into();
    let b = b.into();
    let switch = switch.into();

    let a_sub_b = gate.sub(ctx, a, b);
    let b_sub_a = gate.sub(ctx, b, a);

    let left = gate.mul_add(ctx, b_sub_a, switch, a); // left = (b-a)*s + a;
    let right = gate.mul_add(ctx, a_sub_b, switch, b); // right = (a-b)*s + b;
    [left, right]
}

fn main() {
    env_logger::init();

    let args = Cli::parse();
    run(hash_two, args);
}
