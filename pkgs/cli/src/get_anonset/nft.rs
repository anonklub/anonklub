use std::fs;

pub fn get_nft_anonset(address:String) {
    let contents = fs::read_to_string("../tests/fixtures/addresses.json")
        .expect("Something went wrong reading the file");
    println!("{}", contents);
}
