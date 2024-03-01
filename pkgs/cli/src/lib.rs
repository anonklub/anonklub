use anyhow::Result;
use clap::ValueEnum;

mod get_anonset;
pub use get_anonset::*;

mod query_client;
pub use query_client::get_query_client;

#[derive(Debug, Clone, ValueEnum)]
pub enum EnsVoteChoice {
    Yes,
    No,
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
