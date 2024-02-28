use std::fs;
use crate::EnsVoteChoice;

pub fn get_ens_dao_anonset(pid:String, choice: EnsVoteChoice) {
    let contents = fs::read_to_string("../tests/fixtures/addresses.json")
        .expect("Something went wrong reading the file");
    println!("{}", contents);
}
