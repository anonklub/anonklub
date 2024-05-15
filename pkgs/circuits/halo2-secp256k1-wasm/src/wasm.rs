use anyhow::{anyhow, Context, Result};
use ecdsa::ECDSAInputs;
use eff_ecdsa::Secp256k1VerifyCircuit;
use halo2_base::{
    halo2_proofs::{
        arithmetic::CurveAffine,
        halo2curves::{bn256::Bn256, pairing::Engine, secp256k1},
        plonk::{Circuit, ProvingKey},
        poly::kzg::commitment::ParamsKZG,
    },
    utils::{BigPrimeField, ScalarField},
};
use halo2_wasm::{CircuitConfig, Halo2Wasm};
use num_bigint::BigUint;
use rand::rngs::StdRng;

use crate::{ecdsa::Secp256k1VerifyCircuit, recovery::recover_pk_eff};

#[wasm_bindgen]
pub fn prove_membership(s: &[u8], r: &[u8], msg_hash: &[u8], is_y_odd: bool) -> Result<Vec<u8>> {
    let config = read_config("configs/secp256k1_ecdsa_circuit.config")?;
    let circuit = create_circuit(s, r, msg_hash, is_y_odd)?;
    let anonklub_proof = generate_proof(&config, &circuit)?;

    Ok(anonklub_proof)
}

#[wasm_bindgen]
pub fn verify_membership(anonklub_proof: &[u8]) -> bool {
    verify_proof::<Bn256>(anonklub_proof)
}

fn read_config(path: &str) -> Result<CircuitConfig> {
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

fn create_circuit(
    s: &[u8],
    r: &[u8],
    msg_hash: &[u8],
    is_y_odd: bool,
) -> Result<Secp256k1VerifyCircuit> {
    // Deserialize the inputs
    let s = secp256k1::Fq::from_bytes_le(s);
    let r = secp256k1::Fq::from_bytes_le(r);
    let msg_hash = BigUint::from_bytes_be(msg_hash);

    // Compute the efficient ECDSA inputs
    let (U, T) = recover_pk_eff(msg_hash, r, is_y_odd).context("Failed to recover the PK!")?;

    let msg_hash = secp256k1::Fq::from_bytes_le(msg_hash);

    let ecdsa_inputs = ECDSAInputs { r, s, msg_hash, pk };

    let circuit = Secp256k1VerifyCircuit::new(&halo2_wasm, ecdsa_inputs)
        .map_err(|e| anyhow!(e))
        .context("Failed to initialize the circuit!")?;

    Ok(circuit)
}

fn generate_params<E>(k: usize) -> Result<ParamsKZG<E>>
where
    E: Engine,
{
    let params = ParamsKZG::<C>::setup(15, OsRng);

    Ok(params)
}

fn initialize_halo2_wasm<E>(
    config: &CircuitConfig,
    circuit: Secp256k1VerifyCircuit,
) -> Result<Halo2Wasm>
where
    E: Engine,
{
    let mut halo2_wasm = Halo2Wasm::new();

    halo2_wasm.config(config);

    // Get Circuit Stats
    let circuit_stats = halo2_wasm.get_circuit_stats();

    // Generate Params based on the circuit stats
    let params = generate_params::<E>(15)?;

    // Load params
    halo2_wasm.load_params(&serialize_params_to_bytes(&params));

    // Generate VK
    halo2_wasm.gen_vk();

    // Generate PK
    halo2_wasm.gen_pk();

    Ok(halo2_wasm)
}

fn generate_proof<E>(config: &CircuitConfig, mut circuit: Secp256k1VerifyCircuit) -> Result<Vec<u8>>
where
    E: Engine,
{
    let halo2_wasm = initialize_halo2_wasm::<E>(config, circuit)?;

    circuit
        .verify_signature()
        .map_err(|e| anyhow!(e))
        .context("The circuit failed to verify signature!")?;

    // Generate proof
    let proof = halo2_wasm.prove();

    Ok(proof)
}

fn verify_proof<E>(anonklub_proof: &[u8]) -> Result<()>
where
    E: Engine,
{
    let halo2_wasm = initialize_halo2_wasm::<E>(config, circuit)?;

    halo2_wasm.verify(anonklub_proof);

    Ok(())
}
