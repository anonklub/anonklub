use assert_cmd::prelude::*;
use predicates::prelude::*;
use std::{env, process::Command};

const BIN_NAME: &str = "akli";

#[test]
fn build_merkle_proof() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin(BIN_NAME)?;
    let manifest_dir = env::var("CARGO_MANIFEST_DIR").expect("CARGO_MANIFEST_DIR is not set");
    let fixture_path = format!("{}/tests/fixtures/addresses.json", manifest_dir);

    cmd.arg("merkle")
        .arg("-f")
        .arg(fixture_path)
        .arg("-a")
        .arg("0x30b86f843a10ec6b28e8fa76b8b86d8317c708b6");

    cmd.assert().success().stdout(predicate::str::contains("e001000000000000000000000000000000000000f0b9db9a9eed7b55b2e96aa512f5d99527af687e136bd98e396c18a8560d0b99ced4d3eaffe44c75372fc8d4386251d9292872ef56136f9fc9a26431d943e992da61dcbaa60dc07f45cd532d52b1e1f6ff0729d77e86add6589abbab1cee73d8ca9b68955937382c800b880ef80b8e3c50337983d6643f883361d3b3c3bd54f6a0481866b11df5c49b71f9b318c2721317546e614dd9c2bbd726a59fe26ad09854abe631962a3df82d9135393c629281f9af5f8ead5b4ed75d5ec15f7e39f7292d862b9770f6bb84d9c658e26ef8d0ebd30646037107c84987656833c9bbfd77f50282010c5b9a520505260cb87f308323effe7bb5e160b0f33f6cc9ade6e7f1b1542364e0c3aa75d7363c8dd14404358e96f11ee27032ee6f314ccbeaebe9a01c0fff70fc14c8f65ccb2b5ececfea4f1b5e8e43842132ea0ee012c3415e38cadf1154955bd0e291a650cca0b33b332f1d75edf01a0371530e9725b7de7ccb834d034630b851c1122766634c2d7a3daa7a40d5dc828767c25068af5a5947c18015f52080f9bbec0180b96f300f92854c3dc85de85076c02c1f27d19b4413e39cd7414e88ea69d11aac0302d49986a5be2ea524ada95dde192c22060ad5bbe12c70da154cb66511e61a7b5e0cd24c5b853e99562ce0010000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000e3bc08980139dddb41de1f4b64483840fe0ad54490cf0c916664d9447ed9bb46"));

    Ok(())
}