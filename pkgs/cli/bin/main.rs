use akli::{
    get_beacon_anonset, get_ens_dao_anonset, get_erc20_anonset, get_eth_anonset, get_nft_anonset,
    get_punks_anonset, pprint,
};
use anyhow::Result;
use clap::Parser;

pub mod opts;
use merkle_tree_wasm::generate_merkle_proof;
use opts::{Akli, AkliCommand, QuerySubcommand};

#[async_std::main]
async fn main() -> Result<()> {
    let Akli { cmd } = Akli::parse();

    match cmd {
        AkliCommand::Query(query) => match query {
            QuerySubcommand::Beacon => {
                pprint(get_beacon_anonset().await);
            }
            QuerySubcommand::Erc20 { address, min } => {
                pprint(get_erc20_anonset(address, min).await);
            }
            QuerySubcommand::Eth { min } => {
                pprint(get_eth_anonset(min).await);
            }
            QuerySubcommand::Nft { address } => {
                pprint(get_nft_anonset(address).await);
            }
            QuerySubcommand::Punks => {
                pprint(get_punks_anonset().await);
            }
            QuerySubcommand::Ens { id, choice } => {
                pprint(get_ens_dao_anonset(id, choice).await);
            }
        },
        AkliCommand::Merkle {
            file: anonset,
            address,
        } => {
            let merkle_proof =
                generate_merkle_proof(anonset.0, address.to_string().to_lowercase(), 15)
                    .iter()
                    .map(|x| format!("{:02x}", x))
                    .collect::<String>();
            println!("{:?}", merkle_proof);
        }
        AkliCommand::Prove {
            merkle_root,
            message,
            private_key,
        } => {
            println!("Prove");
            println!("Merkle Root: {}", merkle_root);
            println!("Message: {}", message);
            println!("Private Key: {}", private_key);
        }
        AkliCommand::Verify => {
            println!("Verify");
        }
    }

    Ok(())
}
