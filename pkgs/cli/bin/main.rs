use akli::{
    get_beacon_anonset, get_ens_dao_anonset, get_erc20_anonset, get_eth_anonset, get_nft_anonset,
    get_punks_anonset, hexlify, pprint,
};
use anyhow::Result;
use clap::Parser;

pub mod opts;
use merkle_tree_wasm::{generate_merkle_proof, generate_merkle_root};
use opts::{Akli, AkliCommand, QuerySubcommand};
use spartan_ecdsa_wasm::verify_membership;

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
                    generate_merkle_proof(anonset.0, address.to_string().to_lowercase(), 15)?;
                println!("{}", hexlify(merkle_proof));
            }
            MerkleSubcommand::Root { file: anonset } => {
                let merkle_root = generate_merkle_root(anonset.0, 15)?;
                println!("{}", hexlify(merkle_root));
            }
        },
        AkliCommand::Prove { .. } => {
            println!("Not implemented");
        }
        AkliCommand::Verify { path } => {
            let content = std::fs::read(path)?;
            let result = verify_membership(&content);
            println!("{}", result);
        }
    }

    Ok(())
}
