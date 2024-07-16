use akli::EnsVoteChoice;
use assert_cmd::prelude::*;
use mockito::Server;
use predicates::prelude::*;
use serde_json::json;
use std::process::Command;

const BIN_NAME: &str = "akli";

fn setup_test() -> (mockito::ServerGuard, Command) {
    let server = Server::new();
    let mut cmd = Command::cargo_bin(BIN_NAME).unwrap();
    cmd.env("QUERY_API_URL", server.url());
    (server, cmd)
}

#[test]
fn no_args() -> Result<(), Box<dyn std::error::Error>> {
    let (_, mut cmd) = setup_test();
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("Usage"));

    Ok(())
}

#[test]
fn query_eth() {
    let (mut server, mut cmd) = setup_test();
    const MIN: &str = "100000";
    const ADDRESS: &str = "0x2b661d3a28490794000b7FCaA5f9D732501bbb";
    server
        .mock("GET", format!("/asset/eth?min={}", MIN).as_str())
        .with_status(200)
        .with_header("content-type", "application/json")
        .with_body(json!([ADDRESS]).to_string())
        .create();

    cmd.arg("query").arg("eth").arg("--min").arg(MIN);
    cmd.assert()
        .success()
        .stdout(predicate::str::contains(ADDRESS));
}

#[test]
fn query_erc20_odd_address() {
    let (_, mut cmd) = setup_test();
    cmd.arg("query")
        .arg("erc20")
        .arg("--address")
        .arg("0x0")
        .arg("--min")
        .arg("100000");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("odd number of digits"));
}

#[test]
fn query_erc20_wrong_length_address() {
    let (_, mut cmd) = setup_test();
    cmd.arg("query")
        .arg("erc20")
        .arg("--address")
        .arg("0x2b661d3a28490794000b7FCaA5f9D732501bbb");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("invalid string length"));
}

#[test]
fn query_erc20_wrong_min() {
    let (_, mut cmd) = setup_test();

    cmd.arg("query")
        .arg("erc20")
        .arg("--address")
        .arg("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
        .arg("--min")
        .arg("abc");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("invalid digit found in string"));
}

#[test]
fn query_erc20() {
    let (mut server, mut cmd) = setup_test();
    const MIN: &str = "100000";
    const ADDRESS: &str = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
    server
        .mock(
            "GET",
            format!("/asset/erc20?tokenAddress={}&min={}", ADDRESS, MIN).as_str(),
        )
        .with_status(200)
        .with_header("content-type", "application/json")
        .with_body(json!([ADDRESS]).to_string())
        .create();

    cmd.arg("query")
        .arg("erc20")
        .arg("--address")
        .arg(ADDRESS)
        .arg("--min")
        .arg(MIN);
    cmd.assert()
        .success()
        .stdout(predicate::str::contains(ADDRESS));
}

#[test]
fn query_ens_wrong_choice() {
    let mut cmd = Command::cargo_bin(BIN_NAME).unwrap();

    cmd.arg("query")
        .arg("ens")
        .arg("--id")
        .arg("anonklub.eth")
        .arg("--choice")
        .arg("abc");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("invalid value"))
        .stderr(predicate::str::contains(
            "possible values: yes, no, abstain",
        ));
}

#[test]
fn query_ens() {
    let (mut server, mut cmd) = setup_test();
    const ID: &str =
        "15706104363492914432572227540113855373051896881975394006732444538096386655538";
    #[allow(non_snake_case)]
    let CHOICE = EnsVoteChoice::Abstain;
    const ADDRESS: &str = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

    assert_eq!(CHOICE.as_ref(), "ABSTAIN");
    server
        .mock(
            "GET",
            format!("/dao/ens?id={}&choice={}", ID, CHOICE.as_ref()).as_str(),
        )
        .with_status(200)
        .with_header("content-type", "application/json")
        .with_body(json!([ADDRESS]).to_string())
        .create();

    cmd.arg("query")
        .arg("ens")
        .arg("--id")
        .arg(ID)
        .arg("--choice")
        .arg(CHOICE.as_ref().to_lowercase());
    cmd.assert()
        .success()
        .stdout(predicate::str::contains(ADDRESS));
}
