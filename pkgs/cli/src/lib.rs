use clap::ValueEnum;
mod get_anonset;
pub use get_anonset::*;

#[derive(Debug, Clone, ValueEnum)]
pub enum EnsVoteChoice {
    Yes,
    No,
    Abstain,
}
