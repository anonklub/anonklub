mod beacon;
pub use beacon::*;

mod ens_dao;
pub use ens_dao::*;

mod erc20;
pub use erc20::*;

mod eth;
pub use eth::*;

mod nft;
pub use nft::*;

pub mod punks;
pub use punks::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Anonset(pub Vec<String>);
