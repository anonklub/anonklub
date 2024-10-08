use std::result::Result as StdResult;
use subtle::CtOption;

/// @src https://github.com/privacy-scaling-explorations/zkevm-circuits/blob/main/eth-types/src/sign_types.rs
/// Helper function to convert a `CtOption` into an `Result`.  Similar to
/// `Option::ok_or`.
/// TODO: switch to anyhow result
pub fn ct_option_ok_or<T, E>(v: CtOption<T>, err: E) -> StdResult<T, E> {
    Option::<T>::from(v).ok_or(err)
}
