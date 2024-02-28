use akli::{ get_beacon_anonset, get_ens_dao_anonset, get_erc20_anonset, get_eth_anonset, get_nft_anonset, get_punks_anonset};
use anyhow::Result;
use clap::Parser;

pub mod opts;
use opts::{Akli, AkliCommand, QuerySubcommand};

fn main() -> Result<()> {
     let Akli { cmd } = Akli::parse();

    match cmd {
        AkliCommand::Query(query) => match query {
            QuerySubcommand::Beacon => {
                println!("Beacon");
                println!("{:?}", get_beacon_anonset());
            }
            QuerySubcommand::Erc20 { address, min } => {
                println!("Erc20: address: {}, min: {:?}", address, min);
                println!("{:?}", get_erc20_anonset(address, min));
            }
            QuerySubcommand::Eth { min } => {
                println!("Eth: min: {:?}", min);
                println!("{:?}", get_eth_anonset(min));
            },
            QuerySubcommand::Nft { address } => {
                println!("Nft: address: {}", address);
                println!("{:?}", get_nft_anonset(address));
            },
            QuerySubcommand::Punks => {
                println!("Cryptopunk");
                println!("{:?}", get_punks_anonset());
            },
            QuerySubcommand::Ens { id, choice } => {
                println!("Ens: id: {}, choice: {:?}", id, choice);
                println!("{:?}",get_ens_dao_anonset(id, choice));
            }
        },
        AkliCommand::Prove => {
            println!("Prove");
        },
        AkliCommand::Verify => {
            println!("Verify");
        }
    }

    Ok(())
}
