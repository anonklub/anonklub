use halo2_base::halo2_proofs::halo2curves::bn256;

pub type F = bn256::Fr; // Scalar Native FF;

/// Binary Merkle Tree
pub const WIDTH: usize = 3;
pub const ARITY: usize = WIDTH - 1;

/// Poseidon
/// `State` is structure `T` sized field elements that are subjected to
/// permutation
pub const T: usize = 3;
pub const RATE: usize = 2;
pub const R_F: usize = 8;
pub const R_P: usize = 57;
