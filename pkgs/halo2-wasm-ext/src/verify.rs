use anyhow::{anyhow, Context, Ok, Result};
use halo2_base::halo2_proofs::poly::{
    ipa::strategy::SingleStrategy,
    kzg::{commitment::KZGCommitmentScheme, multiopen::VerifierSHPLONK},
};

pub fn verify() -> Result<bool> {
    verify_proof::<KZGCommitmentScheme<E>, VerifierSHPLONK<'_, E>, _, _, _>(
        verifier_params,
        &vk,
        SingleStrategy::new(verifier_params),
        &[&instances],
        &mut transcript_read,
    )
    .map_err(|e| anyhow!(e))
    .context("Failed to verify the proof")
    .is_ok()
}
