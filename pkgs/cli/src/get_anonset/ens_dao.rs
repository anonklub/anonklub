use crate::{get_anonset, Anonset, EnsVoteChoice};
use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct EnsDaoQuery {
    // TODO: use Address type from alloy-primitives
    id: String,
    choice: EnsVoteChoice,
}

pub async fn get_ens_dao_anonset(id: String, choice: EnsVoteChoice) -> Result<Anonset> {
    get_anonset(Some(EnsDaoQuery { id, choice }), "asset/erc20").await
}
