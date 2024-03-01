use crate::{get_anonset, Anonset};
use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct NftAnonSetQuery {
    // TODO: use Address type from alloy-primitives
    tokenAddress: String
}

pub async fn get_nft_anonset(address: String) -> Result<Anonset> {
    get_anonset(
        Some(NftAnonSetQuery {
            tokenAddress: address,
        }),
        "asset/nft",
    )
    .await
}
