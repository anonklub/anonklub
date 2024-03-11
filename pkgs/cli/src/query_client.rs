use anyhow::{Result, Context};
use std::time::Duration;
use surf::{Client, Config, Url};
use std::env;

const QUERY_BASE_URL: &str = "https://anonset.fly.dev/";

pub fn get_query_client() -> Result<Client> {
    let base_url = env::var("QUERY_API_URL").unwrap_or_else(|_| QUERY_BASE_URL.to_string());
    let base_url = Url::parse(&base_url).map_err(|e| anyhow::anyhow!(e)).with_context(|| format!("Failed to parse base URL: {}", base_url))?;
    Ok(Config::new()
        .set_base_url(base_url)
        .set_timeout(Some(Duration::from_secs(30)))
        .try_into()?)
}
