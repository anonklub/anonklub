use crate::{get_anonset, Anonset};
use serde::{Deserialize, Serialize};
use anyhow::Result;

#[derive(Serialize, Deserialize)]
struct Erc20AnonSetQuery {
    // TODO: use Address type from alloy-primitives
    tokenAddress: String,
    min: Option<u64>,
}

pub async fn get_erc20_anonset(address: String, min: Option<u64>) -> Result<Anonset> {
    get_anonset(Erc20AnonSetQuery {tokenAddress: address, min}, "asset/erc20").await
}
