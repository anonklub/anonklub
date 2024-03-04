use assert_cmd::prelude::*; // Add methods on commands
use predicates::prelude::*; // Used for writing assertions
use std::process::Command; // Run programs

const BIN_NAME: &str = "akli";

#[test]
fn no_args() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin(BIN_NAME)?;

    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("Usage"));

    Ok(())
}

#[test]
fn query_eth() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin(BIN_NAME)?;

    cmd.arg("query").arg("eth").arg("--min").arg("100000");
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("0x"));
    Ok(())
}

#[test]
fn query_erc20_odd_address() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin(BIN_NAME)?;

    cmd.arg("query").arg("erc20").arg("--address").arg("0x0").arg("--min").arg("100000");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("Odd number of digits"));

    Ok(())
}

#[test]
fn query_erc20_wrong_length_address() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin(BIN_NAME)?;

    cmd.arg("query").arg("erc20").arg("--address").arg("0x2b661d3a28490794000b7FCaA5f9D732501bbb");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("Invalid string length"));
    Ok(())
}

#[test]
fn query_erc20_wrong_min() {
    let mut cmd = Command::cargo_bin(BIN_NAME).unwrap();

    cmd.arg("query").arg("erc20").arg("--address").arg("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045").arg("--min").arg("abc");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("invalid digit found in string"));
}

#[test]
fn query_ens_wrong_choice() {
    let mut cmd = Command::cargo_bin(BIN_NAME).unwrap();

    cmd.arg("query").arg("ens").arg("--id").arg("anonklub.eth").arg("--choice").arg("abc");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("invalid value"))
        .stderr(predicate::str::contains("possible values: yes, no, abstain"));
}
