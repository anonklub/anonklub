use clap::Parser;
use halo2_base::{
    gates::{GateChip, RangeInstructions},
    gates::{GateInstructions, RangeChip},
    utils::ScalarField,
    AssignedValue, Context, QuantumCell,
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
    pub leaf: String,
    pub path: [String; 5],
    pub switch: [String; 5],
}

// Verifies a merkle proof
fn merkle_proof<F: ScalarField>(
    ctx: &mut Context<F>,
    inp: CircuitInput,
    make_public: &mut Vec<AssignedValue<F>>,
) {
    // Load variables as private inputs
    let leaf = ctx.load_witness(F::from_str_vartime(&inp.leaf).unwrap());
    let path =
        inp.path.map(|elem| ctx.load_witness(F::from_str_vartime(&elem).unwrap())).into_iter();
    let switch =
        inp.switch.map(|elem| ctx.load_witness(F::from_str_vartime(&elem).unwrap())).into_iter();
    let gate = GateChip::<F>::default();

    let mut next_hash = leaf;
    for (s, p) in switch.zip(path) {
        gate.assert_bit(ctx, s);
        let [a, b] = dual_mux(&gate, ctx, next_hash, p, s);

        let mut poseidon = PoseidonChip::<F, T, RATE>::new(ctx, R_F, R_P).unwrap();
        poseidon.update(&[a, b]);
        next_hash = poseidon.squeeze(ctx, &gate).unwrap();
        println!("a: {:?}, b: {:?}, poseidon(a,b)): {:?}", a.value(), b.value(), next_hash.value());
    }
    make_public.push(next_hash); // make the root public
    println!("Merkle root: {:?}", next_hash.value());

    // TODO: test that the output is the same as circom
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
    run(merkle_proof, args);
}
