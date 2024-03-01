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
