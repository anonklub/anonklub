use crate::eth_membership::EthMembershipCircuit;
use anyhow::Result;
use halo2_base::utils::{BigPrimeField, CurveAffineExt};
use halo2_wasm::Halo2Wasm;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

fn log_message(message: &str) {
    log(message);
}

pub fn generate_proof<CF, SF, GA>(
    circuit: &mut EthMembershipCircuit<CF, SF, GA>,
    halo2_wasm: &Halo2Wasm,
) -> Result<Vec<u8>>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    log_message("Starting circuit verification");

    circuit.verify_membership();
    log_message("Circuit verification successful");

    // Generate proof
    let proof = halo2_wasm.prove();

    log_message("Proof generation successful");

    Ok(proof)
}
