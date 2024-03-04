use std::path::PathBuf;

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

#[derive(Debug, Clone, Serialize, Deserialize )]
pub struct Path(PathBuf);

pub fn parse_path(s: &str) -> Result<Anonset> {
    let path = PathBuf::from(s);

    if !path.exists() {
        return Err(anyhow::anyhow!("Path does not exist: {:?}", path));
    }

    if !path.is_file() {
        return Err(anyhow::anyhow!("Path is not a file: {:?}", path));
    }

    // check the file is json file
    if path.extension().unwrap() != "json" {
        return Err(anyhow::anyhow!("Path is not a json file: {:?}", path));
    }

    // try to read the json file
    let anonset: Result<Anonset> = match std::fs::read_to_string(&path) {
        Ok(json) => match serde_json::from_str::<Anonset>(&json) {
            Ok(anonset) => Ok(anonset),
            Err(e) => Err(anyhow::anyhow!("Error deserializing anonset: {:?}", e)),
        },
        Err(e) => Err(anyhow::anyhow!("Error reading file: {:?}", e)),
    };

    anonset
}
