// build.rs
use std::env;
use std::fs;
use std::path::Path;

fn main() {
    let out_dir = env::var("OUT_DIR").unwrap();
    let dest_path = Path::new(&out_dir).join("eth_membership_config.rs");

    let config_data =
        fs::read_to_string("configs/eth_membership.cfg").expect("Unable to read config file");

    fs::write(
        &dest_path,
        format!(
            "const ETH_MEMBERSHIP_CONFIG: &str = r#\"{}\"#;",
            config_data
        ),
    )
    .unwrap();
}
