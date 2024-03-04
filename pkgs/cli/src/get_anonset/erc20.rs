#![allow(non_snake_case)]

use crate::{get_anonset, Anonset};
use alloy_primitives::Address;
use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Erc20AnonSetQuery {
    // TODO: use Address type from alloy-primitives
    tokenAddress: String,
    min: Option<u64>,
}

pub async fn get_erc20_anonset(address: Address, min: Option<u64>) -> Result<Anonset> {
    get_anonset(
        Some(Erc20AnonSetQuery {
            tokenAddress: address.to_string(),
            min,
        }),
        "asset/erc20",
    )
    .await
}
