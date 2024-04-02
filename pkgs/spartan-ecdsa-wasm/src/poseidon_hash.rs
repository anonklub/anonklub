use sapir::{
    ark_ff::Field, constraint_system::ConstraintSystem,
    frontend::gadgets::poseidon::poseidon::PoseidonChip, poseidon::constants::secp256k1_w3,
};

const WIDTH: usize = 3;

pub fn poseidon_hash_synthetizer<F: Field>(cs: &mut ConstraintSystem<F>) {
    let x = cs.alloc_priv_input();
    let y = cs.alloc_priv_input();

    let mut poseidon_chip = PoseidonChip::<F, WIDTH>::new(cs, secp256k1_w3());
    let tag = F::from(3u32);
    poseidon_chip.state[0] = cs.alloc_const(tag);
    poseidon_chip.state[1] = x;
    poseidon_chip.state[2] = y;

    poseidon_chip.permute();

    let out = poseidon_chip.state[1];
    cs.expose_public(out);
}

mod tests {
    use super::poseidon_hash_synthetizer;
    use sapir::{
        poseidon::{constants::secp256k1_w3, Poseidon},
        test_satisfiability,
    };

    type F = ark_secp256k1::Fr;

    #[test]
    fn test_poseidon() {
        let mut poseidon = Poseidon::<F, 3>::new(secp256k1_w3());

        let a = F::from(4);
        let b = F::from(5);

        poseidon.state[0] = F::from(3);
        poseidon.state[1] = a;
        poseidon.state[2] = b;

        poseidon.permute();

        let expected_out = poseidon.state[1];

        let priv_inputs = [a, b];
        let pub_inputs = [expected_out];

        test_satisfiability(poseidon_hash_synthetizer, &pub_inputs, &priv_inputs);
    }
}
