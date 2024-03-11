use crate::{get_anonset, Anonset, EnsVoteChoice};
use anyhow::Result;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct EnsDaoQuery {
    // TODO: use Address type from alloy-primitives
    id: String,
    choice: String,
}

pub async fn get_ens_dao_anonset(id: String, choice: EnsVoteChoice) -> Result<Anonset> {
    get_anonset(Some(EnsDaoQuery { id, choice: choice.to_string().to_uppercase() }), "dao/ens").await
}
