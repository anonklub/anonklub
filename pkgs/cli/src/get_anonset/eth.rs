use std::fs;

pub fn get_eth_anonset(min: Option<u64>) {
    // as a fixture
    // open the json file at tests/fixtures/eth.json
    // and print the contents

    let contents = fs::read_to_string("../tests/fixtures/addresses.json")
        .expect("Something went wrong reading the file");
    println!("{}", contents);
}
