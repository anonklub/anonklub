use anyhow::Result;
use reqwest::Error;

pub mod circuit;
pub mod consts;
pub mod prove;

pub async fn fetch_kzg_params(k: u32) -> Result<Vec<u8>> {
    let url = format!(
        "https://halo2-ecdsa-params.s3.us-east-2.amazonaws.com/params_{}.bin",
        k
    );
    let response = reqwest::get(&url).await?;

    let bytes = response.bytes().await?;
    let params = bytes.to_vec();

    Ok(params)
}
