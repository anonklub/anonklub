use clap::{Parser, Subcommand, ValueEnum};
use clap_verbosity_flag::Verbosity;

/// Perform Anonklub operations from the command line
#[derive(Parser)]
#[clap(name = "akli", after_help= "Find more information about Anonklub: https://github.com/anonklub/anonklub", author = "sripwoud")]
pub struct Akli {
    #[clap(subcommand)]
    pub cmd: AkliCommand,
    #[clap(flatten)]
    pub verbosity: Verbosity,
}

#[derive(Debug, Subcommand)]
pub enum AkliCommand {
      #[clap(subcommand, name = "query")]
      QueryCommand (QuerySubcommand)
}

#[derive(Debug, Subcommand)]
pub enum QuerySubcommand {
    Erc20 {
        #[clap(short, long)]
        address: String,
        #[clap(short,long)]
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
    Cryptopunk,
    Ens {
        #[clap(short, long)]
        id: String,
        #[clap(short, long)]
        choice: EnsVoteChoice,
    }
}

#[derive(Debug, Clone, ValueEnum)]
pub enum EnsVoteChoice {
    Yes,
    No,
    Abstain
}
