use akli::{
    get_beacon_anonset, get_ens_dao_anonset, get_erc20_anonset, get_eth_anonset, get_nft_anonset,
    get_punks_anonset, pprint,
};
use anyhow::Result;
use clap::Parser;
use std::fmt::Write;

pub mod opts;
use merkle_tree_wasm::{generate_merkle_proof, generate_merkle_root};
use opts::{Akli, AkliCommand, QuerySubcommand};

use crate::opts::MerkleSubcommand;

#[async_std::main]
async fn main() -> Result<()> {
    let Akli { cmd } = Akli::parse();

    match cmd {
        AkliCommand::Query(query_subcommand) => match query_subcommand {
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
        AkliCommand::Merkle(merkle_subcommand) => match merkle_subcommand {
            MerkleSubcommand::Proof {
                file: anonset,
                address,
            } => {
                let merkle_proof =
                    generate_merkle_proof(anonset.0, address.to_string().to_lowercase(), 15)
                        .map_err(|e| {
                            anyhow::Error::msg(format!("Error generating merkle proof: {:?}", e))
                        })?;
                let merkle_proof_hex = merkle_proof.iter().fold(String::new(), |mut acc, x| {
                    write!(acc, "{:02x}", x).expect("Failed to write string");
                    acc
                });
                println!("{}", merkle_proof_hex);
            }
            MerkleSubcommand::Root { file: anonset } => {
                let merkle_root = generate_merkle_root(anonset.0, 15).map_err(|e| {
                    anyhow::Error::msg(format!("Error generating merkle root: {:?}", e))
                })?;

                // TODO: extract in helper function
                let merkle_root_hex = merkle_root.iter().fold(String::new(), |mut acc, x| {
                    write!(acc, "{:02x}", x).expect("Failed to write string");
                    acc
                });
                println!("{}", merkle_root_hex);
            }
        },
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
