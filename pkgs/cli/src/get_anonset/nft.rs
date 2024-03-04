#![allow(non_snake_case)]

use crate::{get_anonset, Anonset};
use alloy_primitives::Address;
use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct NftAnonSetQuery {
    // TODO: use Address type from alloy-primitives
    tokenAddress: String,
}

pub async fn get_nft_anonset(address: Address) -> Result<Anonset> {
    get_anonset(
        Some(NftAnonSetQuery {
            tokenAddress: address.to_string(),
        }),
        "asset/nft",
    )
    .await
}
