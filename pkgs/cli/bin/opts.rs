use std::path::PathBuf;

use akli::{parse_path, Anonset, EnsVoteChoice};
use alloy_primitives::Address;
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

    Merkle {
        /// Path to the json file containing a list of addresses (aka Anonymity set)
        #[clap(short, long, value_parser = parse_path)]
        file: Anonset,

        /// Address you want to prove is in the set
        #[clap(short, long, value_parser(|s: &str|s.parse::<Address>()))]
        address: Address,
    },

    Prove {
        #[clap(short, long)]
        merkle_root: String,

        #[clap(short, long)]
        message: String,

        #[clap(short, long)]
        private_key: String,
    },

    #[clap(subcommand, name = "")]
    Verify,
}

#[derive(Debug, Subcommand)]
pub enum QuerySubcommand {
    Beacon,
    Erc20 {
        #[clap(short, long, value_parser(|s: &str|s.parse::<Address>()))]
        address: Address,
        #[clap(short, long)]
        min: Option<u64>,
    },
    Eth {
        #[clap(short, long)]
        min: Option<u64>,
    },
    Nft {
        #[clap(short, long, value_parser(|s: &str|s.parse::<Address>()))]
        address: Address,
    },
    Punks,
    Ens {
        #[clap(short, long)]
        id: String,
        #[clap(short, long)]
        choice: EnsVoteChoice,
    },
}
