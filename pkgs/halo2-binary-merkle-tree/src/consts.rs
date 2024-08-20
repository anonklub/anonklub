/// Binary Merkle Tree
pub const WIDTH: usize = 3;
pub const ARITY: usize = WIDTH - 1;

/// Poseidon
/// `State` is structure `T` sized field elements that are subjected to
/// permutation
///
/// TODO: Unify just one place for variables
pub(crate) const T: usize = 3;
pub(crate) const RATE: usize = 2;
pub(crate) const R_F: usize = 8;
pub(crate) const R_P: usize = 57;
