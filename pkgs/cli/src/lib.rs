pub mod opts;
pub use opts::{Akli, AkliCommand, QuerySubcommand};

use anyhow::Context;
use anyhow::Result;
use clap::Parser;
use clap_verbosity_flag::Verbosity;
use indicatif::ProgressBar;
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::PathBuf;

/// Search for a pattern and display the lines that contain it.
#[derive(Parser, Debug)]
pub struct Cli {
    /// The pattern to look for
    #[arg(short = 'p', long = "pattern")]
    pub pattern: String,
    /// The path to the file to read
    #[arg(short = 'f', long = "file")]
    pub file: std::path::PathBuf,
    #[command(flatten)]
    pub verbosity: Verbosity,
}

// #[derive(Debug)]
// pub struct CustomError(String);

pub fn find_matches(pattern: &str, file: &PathBuf) -> Result<Vec<String>> {
    let pb = ProgressBar::new(100);

    let file = File::open(file).with_context(|| format!("Could not read file: {:?}", &file))?;
    let mut reader = BufReader::new(file);
    let mut line = String::new();
    // creates a vector of strings to push the results to
    let mut results = Vec::new();

    while let Ok(len) = reader.read_line(&mut line) {
        if len == 0 {
            break;
        }
        if line.contains(pattern) {
            results.push(line.trim_end().to_string());
        }
        line.clear();
        pb.println(format!("[+] finished reading line: {}", len));
        pb.inc(1);
    }
    pb.finish_with_message("done");
    Ok(results)
}
