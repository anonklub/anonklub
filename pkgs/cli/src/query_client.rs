use anyhow::Result;
use std::time::Duration;
use surf::{Client, Config, Url};

const QUERY_BASE_URL: &str = "https://anonset.fly.dev";

pub fn get_query_client() -> Result<Client> {
    Ok(Config::new()
        .set_base_url(Url::parse(QUERY_BASE_URL)?)
        .set_timeout(Some(Duration::from_secs(30)))
        .try_into()?)
}
