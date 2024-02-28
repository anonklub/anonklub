use std::fs;

pub fn get_punks_anonset() {
    let contents = fs::read_to_string("../tests/fixtures/addresses.json")
        .expect("Something went wrong reading the file");
    println!("{}", contents);
}
