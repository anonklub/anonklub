use crate::consts::E;
use anyhow::{anyhow, Context, Ok, Result};
use halo2_base::halo2_proofs::poly::kzg::commitment::ParamsKZG;
use halo2_wasm::{CircuitConfig, Halo2Wasm};
use std::fs::File;

pub fn configure_halo2_wasm(halo2_wasm: &mut Halo2Wasm, params: &ParamsKZG<E>) -> Result<()> {
    // Initialize the config and the circuit
    let config = read_config("configs/ecdsa.config")?;
    halo2_wasm.config(config);

    Ok(())
}

pub fn gen_keys(halo2_wasm: &mut Halo2Wasm) -> Result<()> {
    // Generate VK
    halo2_wasm.gen_vk();

    // Generate PK
    halo2_wasm.gen_pk();

    Ok(())
}

pub fn read_config(path: &str) -> Result<CircuitConfig> {
    // Read circuit config
    let config: CircuitConfig = serde_json::from_reader(
        File::open(path)
            .map_err(|e| anyhow!(e))
            .with_context(|| format!("The circuit config file does not exist: {}", path))?,
    )
    .map_err(|e| anyhow!(e))
    .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

    Ok(config)
}

pub fn read_config_from_str(config_str: &str) -> Result<CircuitConfig> {
    let config: CircuitConfig = serde_json::from_str(config_str)?;
    Ok(config)
}
