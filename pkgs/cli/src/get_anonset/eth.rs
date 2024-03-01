use crate::{get_query_client, Anonset};
use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct EthAnonSetQuery {
    min: Option<u64>,
}

pub async fn get_eth_anonset(min: Option<u64>) -> Result<Anonset> {
    let eth_anonset_query = EthAnonSetQuery { min };

    let mut res = get_query_client()?
        .get("/asset/eth")
        .query(&eth_anonset_query)
        .map_err(|e| anyhow::anyhow!("Error building request: {:?}", e))?
        .send()
        .await
        .map_err(|e| anyhow::anyhow!("Error sending request: {:?}", e))?;

    if res.status().is_success() {
        let anonset: Vec<String> = res
            .body_json()
            .await
            .map_err(|e| anyhow::anyhow!("Error parsing response: {:?}", e))?;
        Ok(Anonset(anonset))
    } else {
        Err(anyhow::anyhow!(
            "Request failed with status: {:?}",
            res.status()
        ))
    }
}
