use anyhow::Result;
use halo2_base::utils::{BigPrimeField, CurveAffineExt};
use halo2_wasm::Halo2Wasm;

use crate::eth_membership::EthMembershipCircuit;

pub fn generate_proof<CF, SF, GA>(
    circuit: &mut EthMembershipCircuit<CF, SF, GA>,
    halo2_wasm: &Halo2Wasm,
) -> Result<Vec<u8>>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    circuit.verify_membership();

    // Generate proof
    let proof = halo2_wasm.prove();

    Ok(proof)
}
