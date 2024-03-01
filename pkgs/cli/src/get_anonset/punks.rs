use crate::{get_anonset, Anonset};
use anyhow::Result;


pub async fn get_punks_anonset() -> Result<Anonset> {
    get_anonset::<()>(None, "asset/cryptopunk").await
}
