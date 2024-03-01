use crate::{get_anonset, Anonset};
use anyhow::Result;

pub async fn get_beacon_anonset() -> Result<Anonset> {
    get_anonset::<()>(None, "beacon").await
}
