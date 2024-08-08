use halo2_base::{
    gates::{GateChip, GateInstructions},
    poseidon::hasher::PoseidonHasher,
    utils::BigPrimeField,
    AssignedValue, Context,
};

/// @src https://github.com/aerius-labs/zksnap-circuits-halo2/tree/ffa3f7e3c1102deb78520015c02342fda5e0c630/voter/src/merkletree
fn dual_mux<F: BigPrimeField>(
    ctx: &mut Context<F>,
    gate: &GateChip<F>,
    a: &AssignedValue<F>,
    b: &AssignedValue<F>,
    switch: &AssignedValue<F>,
) -> [AssignedValue<F>; 2] {
    gate.assert_bit(ctx, *switch);

    let a_sub_b = gate.sub(ctx, *a, *b);
    let b_sub_a = gate.sub(ctx, *b, *a);

    let left = gate.mul_add(ctx, a_sub_b, *switch, *b);
    let right = gate.mul_add(ctx, b_sub_a, *switch, *a);

    [left, right]
}

pub fn verify_merkle_proof<F: BigPrimeField, const T: usize, const RATE: usize>(
    ctx: &mut Context<F>,
    gate: &GateChip<F>,
    hasher: PoseidonHasher<F, T, RATE>,
    leaf: &AssignedValue<F>,
    root: &AssignedValue<F>,
    siblings: &[AssignedValue<F>],
    path_indices: &[AssignedValue<F>],
) {
    let mut computed_root = ctx.load_witness(*leaf.value());

    for (sibling, path_index) in siblings.iter().zip(path_indices.iter()) {
        let inp = dual_mux(ctx, gate, &computed_root, sibling, path_index);
        computed_root = hasher.hash_fix_len_array(ctx, gate, &inp);
    }

    ctx.constrain_equal(&computed_root, root)
}
