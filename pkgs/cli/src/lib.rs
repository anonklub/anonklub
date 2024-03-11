use anyhow::Result;
use clap::ValueEnum;
use strum::AsRefStr;

mod get_anonset;
pub use get_anonset::*;

mod query_client;
pub use query_client::get_query_client;

use derive_more::Display;
use serde::{Deserialize, Serialize};

#[derive(Debug, Display, Clone, Serialize, Deserialize, ValueEnum, AsRefStr)]
#[serde(rename_all = "UPPERCASE")]
pub enum EnsVoteChoice {
    #[strum(serialize = "YES")]
    Yes,
    #[strum(serialize = "NO")]
    No,
    #[strum(serialize = "ABSTAIN")]
    Abstain,
}

pub fn pprint(anonset: Result<Anonset>) {
    match anonset {
        Ok(anonset) => match serde_json::to_string_pretty(&anonset) {
            Ok(pretty_anonset) => println!("{}", pretty_anonset),
            Err(e) => eprintln!("Error serializing anonset: {:?}", e),
        },
        Err(e) => eprintln!("Error fetching eth anonset: {:?}", e),
    }
}
