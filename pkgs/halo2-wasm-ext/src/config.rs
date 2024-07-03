use halo2_base::halo2_proofs::poly::kzg::commitment::ParamsKZG;
use halo2_wasm::{CircuitConfig, Halo2Wasm};

pub fn configure_halo2_wasm(halo2_wasm: &mut Halo2Wasm, params: &ParamsKZG<E>) -> Result<()> {
    // Initialize the config and the circuit
    let config = read_config("configs/ecdsa.config")?;
    halo2_wasm.config(config);

    // Load params
    halo2_wasm.load_params(&serialize_params_to_bytes(params));

    // Generate VK
    halo2_wasm.gen_vk();

    // Generate PK
    halo2_wasm.gen_pk();

    Ok(())
}

pub fn read_config(path: &str) -> Result<CircuitConfig> {
    // Read circuit config
    let config = serde_json::from_reader(
        File::open(path)
            .map_err(|e| anyhow!(e))
            .with_context(|| format!("The circuit config file does not exist: {}", path))?,
    )
    .map_err(|e| anyhow!(e))
    .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

    Ok(config)
}

