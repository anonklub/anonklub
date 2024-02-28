use std::fs;

pub fn get_erc20_anonset(address:String, min: Option<u64>) {
    let contents = fs::read_to_string("../tests/fixtures/addresses.json")
        .expect("Something went wrong reading the file");
    println!("{}", contents);
}
