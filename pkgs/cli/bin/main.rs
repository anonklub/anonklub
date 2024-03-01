use akli::{
    get_beacon_anonset, get_ens_dao_anonset, get_erc20_anonset, get_eth_anonset, get_nft_anonset,
    get_punks_anonset, pprint,
};
use anyhow::Result;
use clap::Parser;

pub mod opts;
use opts::{Akli, AkliCommand, QuerySubcommand};

#[async_std::main]
async fn main() -> Result<()> {
    let Akli { cmd } = Akli::parse();

    match cmd {
        AkliCommand::Query(query) => match query {
            QuerySubcommand::Beacon => {
                println!("Beacon");
                println!("{:?}", get_beacon_anonset());
            }
            QuerySubcommand::Erc20 { address, min } => {
                pprint(get_erc20_anonset(address, min).await);
            }
            QuerySubcommand::Eth { min } => {
                pprint(get_eth_anonset(min).await);
            }
            QuerySubcommand::Nft { address } => {
                println!("Nft: address: {}", address);
                println!("{:?}", get_nft_anonset(address));
            }
            QuerySubcommand::Punks => {
                pprint(get_punks_anonset().await);
            }
            QuerySubcommand::Ens { id, choice } => {
                println!("Ens: id: {}, choice: {:?}", id, choice);
                println!("{:?}", get_ens_dao_anonset(id, choice));
            }
        },
        AkliCommand::Prove => {
            println!("Prove");
        }
        AkliCommand::Verify => {
            println!("Verify");
        }
    }

    Ok(())
}
