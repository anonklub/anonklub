use crate::{get_anonset, Anonset};
use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct EthAnonSetQuery {
    min: Option<u64>,
}

pub async fn get_eth_anonset(min: Option<u64>) -> Result<Anonset> {
    get_anonset(EthAnonSetQuery { min }, "/eth/anonset").await
}
