use halo2_wasm::Halo2Wasm;
use serde::{Deserialize, Serialize};
use anyhow::{anyhow, Context, Ok, Result};

pub mod eth_membership;

// `AnonklubProof` consists of a Halo2 proof
// This proof is serialized and passed around in the JavaScript runtime.
#[derive(Serialize, Deserialize)]
pub struct EthMembershipProof {
    pub proof: Vec<u8>,
    pub public: Vec<u8>,
    r: Vec<u8>,
    msg_hash: Vec<u8>,
    is_y_odd: bool,
}

impl EthMembershipProof {
    pub fn new(r: Vec<u8>, msg_hash: Vec<u8>, is_y_odd: bool) -> Self {
        Self {
            proof: vec![],
            public: vec![],
            r,
            msg_hash,
            is_y_odd,
        }
    }

    pub fn set_proof(&mut self, proof: Vec<u8>, public: Vec<u8>) {
        self.proof = proof;
        self.public = public;
    }

    pub fn serialize(&self) -> Result<Vec<u8>> {
        bincode::serialize(self).context("Failed to serialize MembershipProof")
    }

    pub fn deserialize(serialized: &[u8]) -> Result<Self> {
        bincode::deserialize(serialized).context("Failed to deserialize MembershipProof")
    }
}

pub fn prove_membership(s: &[u8], r: &[u8], msg_hash: &[u8], is_y_odd: bool) -> Result<Vec<u8>> {
    // Initialize and configure Halo2Wasm
    let mut halo2_wasm = Halo2Wasm::new();
    let params = gen_params(K);
    let _ = configure_halo2_wasm(&mut halo2_wasm, &params);

    // Initialize a Membership proof
    let mut membership_proof = EthMembershipProof::new(r.to_vec(), msg_hash.to_vec(), is_y_odd);

    // Deserialize the inputs
    let s = secp256k1::Fq::from_bytes_le(s);
    let r = secp256k1::Fq::from_bytes_le(r);
    let msg_hash = BigUint::from_bytes_be(msg_hash);

    let mut circuit = create_circuit(s, r, msg_hash, is_y_odd, &halo2_wasm)?;

    // Set public inputs
    let public = circuit.instances.clone();

    //set_instances(&mut halo2_wasm, public.clone(), INSTANCE_COL);

    // Generate the proof
    let proof =
        generate_proof::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>(&mut circuit, &halo2_wasm)?;

    let public = halo2_wasm.get_instance_values_ext(INSTANCE_COL)?;

    // Serialize Membership proof
    membership_proof.set_proof(proof, public.clone());

    let membership_proof_serialized = membership_proof.serialize()?;

    Ok(membership_proof_serialized)
}

pub fn verify_membership(membership_proof: &[u8], instances: &[u8]) -> Result<bool> {
    // Initialize and configure Halo2Wasm
    let mut halo2_wasm = Halo2Wasm::new();
    let params = gen_params(K);
    let _ = configure_halo2_wasm(&mut halo2_wasm, &params);

    // Deserialize Membership proof
    let membership_proof = EthMembershipProof::deserialize(membership_proof)
        .map_err(|e| anyhow!(e))
        .context("Failed to deserialize the proof!")?;

    // Deserialize the inputs
    let r = secp256k1::Fq::from_bytes_le(&membership_proof.r);
    let msg_hash = BigUint::from_bytes_be(&membership_proof.msg_hash);
    let is_y_odd = membership_proof.is_y_odd;
    let proof = membership_proof.proof;

    // Verifications
    let is_proof_valid = halo2_wasm.verify_ext(instances, &proof, params)?;

    let is_eff_ecdsa_valid = verify_efficient_ecdsa(msg_hash, r, is_y_odd, instances)?;

    Ok(is_proof_valid && is_eff_ecdsa_valid)
}
