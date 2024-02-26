use akli::{Akli, AkliCommand, QuerySubcommand};
use anyhow::Result;
use clap::Parser;
use env_logger::Builder;
use log::{debug, info, warn};
use std::io::{prelude::*, stdout};

fn main() -> Result<()> {
    let Akli {
        cmd,
        verbosity,
    } = Akli::parse();

    let query_sub_command = match &cmd {
        AkliCommand::QueryCommand(query) => query,
    };

    match &query_sub_command {
        QuerySubcommand::Erc20 { address, min } => {
            println!("Erc20: address: {}, min: {:?}", address, min);
        }
        QuerySubcommand::Eth { min } => {
            println!("Eth: min: {:?}", min);
        }
        QuerySubcommand::Nft { address } => {
            println!("Nft: address: {}", address);
        }
        QuerySubcommand::Cryptopunk => {
            println!("Cryptopunk");
        }
        QuerySubcommand::Ens { id, choice } => {
            println!("Ens: id: {}, choice: {:?}", id, choice);
        }
    }
    Builder::new()
        .filter_level(verbosity.log_level_filter())
        .init();
    // env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info")).init();
    info!("starting up");
    info!("verbosity: {:?}", verbosity);
    info!("cmd: {:?}", cmd);
    info!("query_sub_command: {:?}", query_sub_command);

    // use BufWriter to write to stdout instead of flushing after every write with println!
    let stdout = stdout();
    let mut handle = stdout.lock();

    //let results = find_matches(&pattern, &file)?;
    warn!("This is a warning");
    debug!("This is a debug message");
    //writeln!(handle, "Results for pattern: `{msg}`:", msg = pattern)?;
    //for result in results {
    //    writeln!(handle, "{}", result)?;
    //}
    Ok(())
}
