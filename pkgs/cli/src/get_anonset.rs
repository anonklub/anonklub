mod beacon;
use anyhow::{anyhow, Result};
pub use beacon::*;

mod ens_dao;
pub use ens_dao::*;

mod erc20;
pub use erc20::*;

mod eth;
pub use eth::*;

mod nft;
pub use nft::*;

pub mod punks;
pub use punks::*;
use serde::{Deserialize, Serialize};

use crate::get_query_client;

#[derive(Serialize, Deserialize)]
pub struct Anonset(pub Vec<String>);

pub async fn get_anonset<T:Serialize>(query_params: T, endpoint: &str) -> Result<Anonset> {
    let mut res = get_query_client()?
        .get(endpoint)
        .query(&query_params)
        .map_err(|e| anyhow!("Error building request: {:?}", e))?
        .send()
        .await
        .map_err(|e| anyhow::anyhow!("Error fetching anonset: {:?}", e))?;

    if res.status().is_success() {
        let anonset = res
            .body_json()
            .await
            .map_err(|e| anyhow::anyhow!("Error parsing anonset: {:?}", e))?;
        Ok(Anonset(anonset))
    } else {
        Err(anyhow::anyhow!("Request failed with status: {:?}", res.status()))
    }
}
