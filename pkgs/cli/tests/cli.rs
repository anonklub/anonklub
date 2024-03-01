use assert_cmd::prelude::*; // Add methods on commands
use assert_fs::prelude::*;
use predicates::prelude::*; // Used for writing assertions
use std::process::Command; // Run programs

const BIN_NAME: &str = "grrs";

#[test]
fn file_doesnt_exist() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin(BIN_NAME)?;

    cmd.arg("-p foo").arg("-f absent.txt");
    cmd.assert()
        .failure()
        .stderr(predicate::str::contains("Could not read file"));

    Ok(())
}
#[test]
fn find_content_in_file() -> Result<(), Box<dyn std::error::Error>> {
    const FILE_NAME: &str = "sample.txt";
    const CONTENT: &str = "A test\nActual content\nMore content\nAnother test";
    const PATTERN: &str = "test";

    let temp_file = assert_fs::NamedTempFile::new(FILE_NAME)?;
    temp_file.write_str(CONTENT)?;

    let mut cmd = Command::cargo_bin(BIN_NAME)?;

    cmd.arg("-p").arg(PATTERN).arg("-f").arg(temp_file.path());
    cmd.assert()
        .success()
        .stdout(predicate::str::contains("A test\nAnother test"));

    Ok(())
}
