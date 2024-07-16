use anyhow::{anyhow, Context, Result};
use halo2_base::utils::{BigPrimeField, CurveAffineExt};
use halo2_wasm::Halo2Wasm;

use crate::circuits::efficient_ecdsa::EfficientECDSACircuit;

pub fn generate_proof<CF, SF, GA>(
    circuit: &mut EfficientECDSACircuit<CF, SF, GA>,
    halo2_wasm: &Halo2Wasm,
) -> Result<Vec<u8>>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    circuit
        .verify_signature()
        .map_err(|e| anyhow!(e))
        .context("The circuit failed to verify signature!")?;

    // Generate proof
    let proof = halo2_wasm.prove();

    Ok(proof)
}
