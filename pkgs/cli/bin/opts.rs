use akli::EnsVoteChoice;
use clap::{Parser, Subcommand};

/// Perform Anonklub operations from the command line
#[derive(Parser)]
#[clap(
    name = "akli",
    after_help = "Find more information about Anonklub: https://github.com/anonklub/anonklub",
    author = "sripwoud"
)]
pub struct Akli {
    #[clap(subcommand)]
    pub cmd: AkliCommand,
}

#[derive(Debug, Subcommand)]
pub enum AkliCommand {
    #[clap(subcommand, name = "query")]
    Query(QuerySubcommand),

    #[clap(subcommand, name = "prove")]
    Prove,

    #[clap(subcommand, name = "verify")]
    Verify,
}

#[derive(Debug, Subcommand)]
pub enum QuerySubcommand {
    Beacon,
    Erc20 {
        #[clap(short, long)]
        address: String,
        #[clap(short, long)]
        min: Option<u64>,
    },
    Eth {
        #[clap(short, long)]
        min: Option<u64>,
    },
    Nft {
        #[clap(short, long)]
        address: String,
    },
    Punks,
    Ens {
        #[clap(short, long)]
        id: String,
        #[clap(short, long)]
        choice: EnsVoteChoice,
    },
}

