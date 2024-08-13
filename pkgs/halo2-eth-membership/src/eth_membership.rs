#![allow(non_snake_case)]
use anyhow::{Context, Ok, Result};
use ethers::abi::Address;
use gloo_utils::format::JsValueSerdeExt;
use halo2_base::{
    gates::{circuit::builder::BaseCircuitBuilder, GateChip, RangeChip},
    halo2_proofs::halo2curves::secp256k1,
    poseidon::hasher::PoseidonHasher,
    utils::{BigPrimeField, CurveAffineExt, ScalarField},
    AssignedValue,
};
use halo2_binary_merkle_tree::{binary_merkle_tree::MerkleProof, gadget::verify_merkle_proof};
use halo2_ecc::{
    bigint::ProperCrtUint,
    ecc::{EcPoint, EccChip},
    fields::FieldChip,
};
use halo2_ecdsa::{
    gadget::{efficient_ecdsa::EfficientECDSAInputs, recover_pk_efficient},
    utils::{
        consts::Point,
        recovery::{pk_bytes_le, pk_bytes_swap_endianness},
    },
};
use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, Halo2Wasm};
use halo2_wasm_ext::utils::ct_option_ok_or;
use hex::encode;
use serde::Serialize;
use snark_verifier::util::arithmetic::CurveAffine;
use snark_verifier_sdk::halo2::OptimizedPoseidonSpec;
use std::{cell::RefCell, marker::PhantomData, rc::Rc};
use tiny_keccak::{Hasher, Keccak};
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

use crate::utils::consts::{
    FpChip, FqChip, CONTEXT_PHASE, F, FIXED_WINDOW_BITS, LIMB_BITS, NUM_LIMBS, RATE_POSEIDON,
    R_F_POSEIDON, R_P_POSEIDON, SECURE_MDS_POSEIDON, T_POSEIDON,
};

// CF is the coordinate field of GA
// SF is the scalar field of GA
#[derive(Debug)]
pub struct EthMembershipInputs<CF, SF, GA>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    efficient_ecdsa: EfficientECDSAInputs<CF, SF, GA>,
    merkle_proof: MerkleProof,
}

impl<CF, SF, GA> EthMembershipInputs<CF, SF, GA>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    pub fn new(
        efficient_ecdsa: EfficientECDSAInputs<CF, SF, GA>,
        merkle_proof: MerkleProof,
    ) -> Self {
        Self {
            efficient_ecdsa,
            merkle_proof,
        }
    }
}

pub struct EthMembershipCircuit<CF, SF, GA>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    pub instances: Vec<u32>,
    eth_membership_inputs: EthMembershipInputs<CF, SF, GA>,
    gate_chip: GateChip<F>,
    range_chip: RangeChip<F>,
    builder: Rc<RefCell<BaseCircuitBuilder<F>>>,
    _CF_marker: PhantomData<CF>,
    _SF_marker: PhantomData<SF>,
    _GA_marker: PhantomData<GA>,
}

impl<CF, SF, GA> EthMembershipCircuit<CF, SF, GA>
where
    CF: BigPrimeField,
    SF: BigPrimeField,
    GA: CurveAffineExt<Base = CF, ScalarExt = SF>,
{
    pub fn new(
        halo2_wasm: &Halo2Wasm,
        eth_membership_inputs: EthMembershipInputs<CF, SF, GA>,
    ) -> Result<Self> {
        let circuit_params = halo2_wasm
            .circuit_params
            .clone()
            .context("Error: Circuit params are not set")?;

        let lookup_bits = circuit_params
            .lookup_bits
            .context("Error: Lookup bits are not set in circuit params")?;

        let gate_chip = GateChip::<F>::new();

        let range_chip = RangeChip::<F>::new(
            lookup_bits,
            halo2_wasm
                .circuit
                .try_borrow()
                .unwrap()
                .lookup_manager()
                .clone(),
        );

        Ok(EthMembershipCircuit {
            instances: vec![],
            eth_membership_inputs,
            gate_chip,
            range_chip,
            builder: Rc::clone(&halo2_wasm.circuit),
            _CF_marker: PhantomData,
            _SF_marker: PhantomData,
            _GA_marker: PhantomData,
        })
    }

    // CF
    fn ecc_base_chip(&self) -> FpChip<F, CF> {
        FpChip::<F, CF>::new(&self.range_chip, LIMB_BITS, NUM_LIMBS)
    }

    // SF
    fn ecc_scalar_chip(&self) -> FqChip<F, SF> {
        FqChip::<F, SF>::new(&self.range_chip, LIMB_BITS, NUM_LIMBS)
    }

    fn load_private_scalar(&mut self) -> ProperCrtUint<F> {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        // Get needed chips
        let scalar_chip = self.ecc_scalar_chip();

        // Assign private inputs
        scalar_chip.load_private(ctx, self.eth_membership_inputs.efficient_ecdsa.s)
    }

    fn load_witnesses(
        &mut self,
    ) -> (
        AssignedValue<F>,
        Vec<AssignedValue<F>>,
        Vec<AssignedValue<F>>,
    ) {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        let root_assigned = ctx.load_witness(self.eth_membership_inputs.merkle_proof.root);

        let siblings_assigned = self
            .eth_membership_inputs
            .merkle_proof
            .siblings
            .iter()
            .map(|sibling| ctx.load_witness(*sibling))
            .collect::<Vec<_>>();

        let path_indices_assigned = self
            .eth_membership_inputs
            .merkle_proof
            .path_indices
            .iter()
            .map(|path_index| ctx.load_witness(*path_index))
            .collect::<Vec<_>>();

        (root_assigned, siblings_assigned, path_indices_assigned)
    }

    fn load_instances(&mut self) -> (Point<F, CF>, Point<F, CF>) {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        // Get BaseField chip
        let base_chip = self.ecc_base_chip();

        // Get Points out fo the T and U
        let (T_x, T_y) = self
            .eth_membership_inputs
            .efficient_ecdsa
            .T
            .into_coordinates();
        let (U_x, U_y) = self
            .eth_membership_inputs
            .efficient_ecdsa
            .U
            .into_coordinates();

        // Set as constants in the BaseField chip
        let (T_x, T_y) = (
            base_chip.load_constant(ctx, T_x),
            base_chip.load_constant(ctx, T_y),
        );

        let (U_x, U_y) = (
            base_chip.load_constant(ctx, U_x),
            base_chip.load_constant(ctx, U_y),
        );

        let precompile_ec_points = (
            EcPoint::new(T_x.clone(), T_y.clone()),
            EcPoint::new(U_x.clone(), U_y.clone()),
        );

        self.instances = vec![T_x, T_y, U_x, U_y]
            .iter()
            .map(|instance_point| {
                instance_point
                    .as_ref()
                    .native()
                    .cell
                    .unwrap()
                    .offset
                    .try_into()
                    .unwrap()
            })
            .collect();

        precompile_ec_points
    }

    fn initialize_poseidon_hasher(&mut self) -> PoseidonHasher<F, T_POSEIDON, RATE_POSEIDON> {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        let mut poseidon_hasher =
            PoseidonHasher::<F, T_POSEIDON, RATE_POSEIDON>::new(OptimizedPoseidonSpec::new::<
                R_F_POSEIDON,
                R_P_POSEIDON,
                SECURE_MDS_POSEIDON,
            >());
        poseidon_hasher.initialize_consts(ctx, &self.gate_chip);

        poseidon_hasher
    }

    fn ecpoint_to_eth_address(&mut self, recovered_pk: &Point<F, CF>) -> AssignedValue<F> {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        let recovered_pk = ct_option_ok_or(
            Secp256k1Affine::from_xy(
                secp256k1::Fp::from_bytes_le(&recovered_pk.x().value().to_bytes_le()),
                secp256k1::Fp::from_bytes_le(&recovered_pk.y().value().to_bytes_le()),
            ),
            "Failed to convert ecpoint into Secp256k1Affine",
        )
        .expect("Failed to convert pk");
        let recovered_pk = pk_bytes_swap_endianness(&pk_bytes_le(&recovered_pk));

        // Keccak-256 hash the serialized point
        let mut pk_hash = [0u8; 32];

        let mut hasher = Keccak::v256();
        hasher.update(recovered_pk.as_ref());
        hasher.finalize(&mut pk_hash);

        // Take the last 20 bytes of the hash to form the Ethereum address
        let mut eth_address = [0u8; 20];
        eth_address.copy_from_slice(&pk_hash[12..]);

        let eth_address = F::from_bytes_le(&eth_address);
        let eth_address = ctx.load_witness(eth_address);

        eth_address
    }

    fn hash(
        &mut self,
        poseidon_hasher: PoseidonHasher<F, T_POSEIDON, RATE_POSEIDON>,
        eth_address: &AssignedValue<F>,
    ) -> AssignedValue<F> {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        poseidon_hasher.hash_fix_len_array(ctx, &self.gate_chip, &[*eth_address])
    }

    fn recover_pk(
        &mut self,
        s: ProperCrtUint<F>,
        T: Point<F, CF>,
        U: Point<F, CF>,
    ) -> Point<F, CF> {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        // Get BaseField chip
        let base_chip = self.ecc_base_chip();
        let scalar_chip = self.ecc_scalar_chip();
        let ecc_chip = EccChip::new(&base_chip);

        recover_pk_efficient::<F, CF, SF, GA>(
            &base_chip,
            &scalar_chip,
            &ecc_chip,
            ctx,
            s,
            T,
            U,
            FIXED_WINDOW_BITS,
        )
    }

    fn verify_membership_merkle_proof(
        &mut self,
        poseidon_hasher: PoseidonHasher<F, T_POSEIDON, RATE_POSEIDON>,
        leaf: &AssignedValue<F>,
        root: &AssignedValue<F>,
        siblings: &[AssignedValue<F>],
        path_indices: &[AssignedValue<F>],
    ) {
        let mut builder = self.builder.borrow_mut();
        let ctx = builder.main(CONTEXT_PHASE);

        verify_merkle_proof::<F, T_POSEIDON, RATE_POSEIDON>(
            ctx,
            &self.gate_chip,
            poseidon_hasher,
            leaf,
            root,
            siblings,
            path_indices,
        )
    }

    pub fn verify_membership(&mut self) {
        // Initialize Poseidon
        let poseidon_hasher = self.initialize_poseidon_hasher();

        // Load private signature scalar finite field
        let s = self.load_private_scalar();

        // Load witness merkle proof
        let (root, siblings, path_indices) = self.load_witnesses();

        // Load T and U as constants in the base field
        let (T, U) = self.load_instances();

        // Recover PK (leaf)
        let recovered_pk = self.recover_pk(s.clone(), T, U);
        let eth_address = self.ecpoint_to_eth_address(&recovered_pk);
        let leaf = self.hash(poseidon_hasher.clone(), &eth_address);

        // Verify membership merkle proof
        self.verify_membership_merkle_proof(
            poseidon_hasher,
            &leaf,
            &root,
            &siblings,
            &path_indices,
        );
    }
}

#[cfg(test)]
mod tests {
    use anyhow::{anyhow, Ok};
    use anyhow::{Context, Result};
    use ethers::types::H160;
    use ethers::utils::secret_key_to_address;
    use ethers::{
        core::k256::{
            ecdsa::SigningKey,
            elliptic_curve::{ScalarPrimitive, SecretKey},
        },
        signers::Wallet,
        utils::hash_message,
    };
    use halo2_base::{
        halo2_proofs::{
            halo2curves::{bn256::Bn256, ff::PrimeField, group::Curve, secp256k1},
            poly::kzg::commitment::ParamsKZG,
        },
        utils::ScalarField,
    };
    use halo2_binary_merkle_tree::binary_merkle_tree::{
        BinaryMerkleTree, MerkleProof, MerkleProofBytes,
    };
    use halo2_binary_merkle_tree::binary_merkle_tree_2::BinaryMerkleTree2;
    use halo2_binary_merkle_tree::consts::ARITY;
    use halo2_ecc::fields::FpStrategy;
    use halo2_ecdsa::gadget::efficient_ecdsa::EfficientECDSAInputs;
    use halo2_ecdsa::utils::recovery::recover_pk_efficient;
    use halo2_ecdsa::utils::verify::verify_efficient_ecdsa;
    use halo2_wasm::{halo2lib::ecc::Secp256k1Affine, CircuitConfig, Halo2Wasm};
    use halo2_wasm_ext::consts::F;
    use halo2_wasm_ext::ext::Halo2WasmExt;
    use halo2_wasm_ext::params::serialize_params_to_bytes;
    use halo2_wasm_ext::utils::ct_option_ok_or;
    use num_bigint::BigUint;
    use pse_poseidon::Poseidon;
    use rand_core::OsRng;
    use serde::{Deserialize, Serialize};
    use std::collections::HashMap;
    use std::io::Read;
    use std::{fs::File, time::Instant};

    use crate::utils::consts::{E, RATE_POSEIDON, R_F_POSEIDON, R_P_POSEIDON, T_POSEIDON};

    use super::{EthMembershipCircuit, EthMembershipInputs};

    const K: u32 = 15;
    const PRIV_KEY: u64 = 42;
    const INSTANCE_COL: usize = 0;
    const TREE_DEPTH: usize = 14;

    #[derive(Clone, Copy, Debug, Serialize, Deserialize)]
    pub struct CircuitParams {
        strategy: FpStrategy,
        degree: u32,
        num_advice: usize,
        num_lookup_advice: usize,
        num_fixed: usize,
        lookup_bits: usize,
        limb_bits: usize,
        num_limbs: usize,
    }

    pub struct TestInputs {
        r: secp256k1::Fp,
        msg_hash: BigUint,
        is_y_odd: bool,
        pk: Secp256k1Affine,
        address: H160,
    }

    /// @src Spartan
    fn mock_eff_ecdsa_input(
        priv_key: u64,
    ) -> Result<(
        EfficientECDSAInputs<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>,
        TestInputs,
    )> {
        let signing_key = SigningKey::from(SecretKey::new(ScalarPrimitive::from(priv_key)));
        let g = secp256k1::Secp256k1Affine::generator();
        let pk = (g * secp256k1::Fq::from(priv_key)).to_affine();
        let address = secret_key_to_address(&signing_key);

        let message = b"harry AnonKlub";
        let msg_hash = hash_message(message);
        let wallet = Wallet::from(signing_key);
        let sig = wallet.sign_hash(msg_hash).unwrap();
        let msg_hash = BigUint::from_bytes_be(&msg_hash.to_fixed_bytes());

        let mut s = [0u8; 32];
        let mut r = [0u8; 32];
        sig.s.to_little_endian(&mut s);
        sig.r.to_little_endian(&mut r);

        let is_y_odd = sig.v == 27;

        let s = ct_option_ok_or(
            secp256k1::Fq::from_repr(s),
            anyhow!("Failed to convert s into Fq."),
        )?;

        let r = ct_option_ok_or(
            secp256k1::Fp::from_repr(r),
            anyhow!("Failed to convert s into Fq."),
        )?;

        let (U, T) = recover_pk_efficient(msg_hash.clone(), r, is_y_odd)
            .map_err(|e| anyhow!(e))
            .context("Failed to compute efficient ECDSA!")?;

        let efficient_ecdsa_inputs =
            EfficientECDSAInputs::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(s, T, U);

        let test_inputs = TestInputs {
            r,
            msg_hash,
            is_y_odd,
            pk,
            address,
        };

        Ok((efficient_ecdsa_inputs, test_inputs))
    }

    fn mock_merkle_proof(pk: &Secp256k1Affine, address: &H160) -> MerkleProof {
        // Initialize Poseidon Hasher
        let mut poseidon =
            Poseidon::<F, T_POSEIDON, RATE_POSEIDON>::new(R_F_POSEIDON, R_P_POSEIDON);

        // Members MerkleTree
        let leaf_x =
            pk.x.to_bytes()
                .to_vec()
                .chunks(11)
                .into_iter()
                .map(|chunk| F::from_bytes_le(chunk))
                .collect::<Vec<_>>();
        let leaf_y =
            pk.y.to_bytes()
                .to_vec()
                .chunks(11)
                .into_iter()
                .map(|chunk| F::from_bytes_le(chunk))
                .collect::<Vec<_>>();

        // Construct Leaves
        let mut leaves = Vec::<F>::new();

        for i in 0..(2usize.pow(TREE_DEPTH as u32) - 1) {
            if i == 0 {
                poseidon.update(leaf_x.as_slice());
                poseidon.update(leaf_y.as_slice());
            } else {
                poseidon.update(&[F::zero()]);
            }

            leaves.push(poseidon.squeeze_and_reset());
        }

        // Construct MerkleTree
        let mut tree = BinaryMerkleTree::<T_POSEIDON, RATE_POSEIDON>::new(&mut poseidon);

        // Insert leaves
        for leaf in leaves.iter() {
            tree.insert(*leaf);
        }

        tree.finish();

        let merkle_proof = tree.gen_proof(leaves[0], address.to_string()).unwrap();

        assert_eq!(tree.verify_proof(merkle_proof.root, &merkle_proof), true);

        merkle_proof
    }

    fn mock_merkle_proof_2(pk: &Secp256k1Affine) -> Result<MerkleProof> {
        // Initialize Poseidon Hasher
        let mut poseidon =
            Poseidon::<F, T_POSEIDON, RATE_POSEIDON>::new(R_F_POSEIDON, R_P_POSEIDON);

        let tree_size: u32 = u32::pow(2, 15);

        // Members MerkleTree
        let leaf_x =
            pk.x.to_bytes()
                .to_vec()
                .chunks(11)
                .into_iter()
                .map(|chunk| F::from_bytes_le(chunk))
                .collect::<Vec<_>>();
        let leaf_y =
            pk.y.to_bytes()
                .to_vec()
                .chunks(11)
                .into_iter()
                .map(|chunk| F::from_bytes_le(chunk))
                .collect::<Vec<_>>();

        // Construct Leaves
        let mut leaves = Vec::<F>::new();

        for i in 0..tree_size {
            if i == 0 {
                poseidon.update(leaf_x.as_slice());
                poseidon.update(leaf_y.as_slice());
            } else {
                poseidon.update(&[F::zero()]);
            }

            leaves.push(poseidon.squeeze_and_reset());
        }

        // Construct MerkleTree
        let mut membership_tree =
            BinaryMerkleTree2::<F, T_POSEIDON, RATE_POSEIDON>::new(&mut poseidon, &mut leaves)
                .unwrap();

        let root = membership_tree.get_root();
        let (siblings, path_indices) = membership_tree.get_proof(0);

        assert_eq!(
            membership_tree.verify_proof(&leaves[0], 0, &root, &siblings),
            true
        );

        Ok(MerkleProof {
            depth: TREE_DEPTH,
            leaf: leaves[0],
            siblings,
            path_indices,
            root,
        })
    }

    #[test]
    fn test_eth_membership_mock_verify() -> Result<()> {
        let path = "configs/eth_membership.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let (ecdsa_inputs, test_inputs) = mock_eff_ecdsa_input(PRIV_KEY)
            .map_err(|e| anyhow!(e))
            .context("Failed to compute efficient ECDSA")?;

        let merkle_proof = mock_merkle_proof_2(&test_inputs.pk)?;

        let eth_membership_inputs = EthMembershipInputs::<
            secp256k1::Fp,
            secp256k1::Fq,
            Secp256k1Affine,
        >::new(ecdsa_inputs, merkle_proof);

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit =
            EthMembershipCircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
                &halo2_wasm,
                eth_membership_inputs,
            )?;

        circuit.verify_membership();

        halo2_wasm.set_instances(&circuit.instances, INSTANCE_COL);
        halo2_wasm.assign_instances();

        halo2_wasm.mock();

        Ok(())
    }

    #[test]
    fn test_mock_eth_membership_real_verify() -> Result<()> {
        let path = "configs/eth_membership.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let (ecdsa_inputs, test_inputs) = mock_eff_ecdsa_input(PRIV_KEY)?;

        let merkle_proof = mock_merkle_proof_2(&test_inputs.pk)?;

        let eth_membership_inputs = EthMembershipInputs::<
            secp256k1::Fp,
            secp256k1::Fq,
            Secp256k1Affine,
        >::new(ecdsa_inputs, merkle_proof);

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit =
            EthMembershipCircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
                &halo2_wasm,
                eth_membership_inputs,
            )?;

        circuit.verify_membership();

        halo2_wasm.set_instances(&circuit.instances, INSTANCE_COL);

        halo2_wasm.assign_instances();

        let params = ParamsKZG::<Bn256>::setup(K, OsRng);

        // Load params
        halo2_wasm.load_params(&serialize_params_to_bytes(&params));

        // Generate VK
        halo2_wasm.gen_vk();

        // Generate PK
        halo2_wasm.gen_pk();

        let start = Instant::now();

        // Time tracking for proof generation
        let proof_start = Instant::now();

        // Generate proof
        let proof: Vec<u8> = halo2_wasm.prove();

        let proof_duration = proof_start.elapsed();
        println!(
            "Eth Membership Proof generation executed in: {:.2?} seconds",
            proof_duration
        );

        // Get the public instance inputs
        let instances = halo2_wasm.get_instance_values_ext(INSTANCE_COL)?;

        // Verify the proof
        println!("Verifying Proof");

        let is_proof_valid = halo2_wasm.verify_ext(&instances, &proof, params)?;

        println!("- Is proof valid? {}", is_proof_valid);

        assert!(is_proof_valid, "The proof is not valid");

        // Verify Eff ECDSA
        println!("Verifying Eth Membership Proof");

        let is_eff_ecdsa_valid = verify_efficient_ecdsa(
            test_inputs.msg_hash,
            test_inputs.r,
            test_inputs.is_y_odd,
            &instances,
        )?;

        println!("- Is Eff ECDSA valid? {}", is_eff_ecdsa_valid);

        assert!(is_eff_ecdsa_valid, "Eff ECDSA is not valid");

        let duration = start.elapsed();
        let duration_in_minutes = duration.as_secs_f64() / 60.0;
        println!("Test executed in: {:.2?} seconds", duration);
        println!("Test executed in: {:.2?} minutes", duration_in_minutes);

        Ok(())
    }

    fn map_to_vec(map: &HashMap<String, u8>) -> Vec<u8> {
        let mut vec: Vec<u8> = vec![0; map.len()];
        for (key, value) in map {
            let index: usize = key.parse().expect("Failed to parse key to usize");
            vec[index] = *value;
        }
        vec
    }

    #[derive(Deserialize)]
    struct RealInputs {
        s: HashMap<String, u8>,
        r: HashMap<String, u8>,
        is_y_odd: bool,
        msg_hash: HashMap<String, u8>,
        merkle_proof_bytes_serialized: HashMap<String, u8>,
    }

    #[test]
    fn test_real_eth_membership_real_verify() -> Result<()> {
        // Read the test inputs from the JSON file
        let mut file =
            File::open("mock/prove_test_inputs.json").expect("Failed to open test inputs file.");
        let mut data = String::new();
        file.read_to_string(&mut data)
            .expect("Failed to read test inputs file.");

        // Parse the JSON data
        let inputs: RealInputs = serde_json::from_str(&data).expect("Failed to parse JSON.");

        // Convert HashMaps to Vec<u8>
        let s = map_to_vec(&inputs.s);
        let r = map_to_vec(&inputs.r);
        let msg_hash = map_to_vec(&inputs.msg_hash);
        let merkle_proof_bytes_serialized = map_to_vec(&inputs.merkle_proof_bytes_serialized);

        let path = "configs/eth_membership.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        // Deserialize the inputs
        let s = secp256k1::Fq::from_bytes_le(&s);
        let r = secp256k1::Fp::from_bytes_le(&r);

        let msg_hash_biguint = BigUint::from_bytes_be(&msg_hash);

        let merkle_proof_bytes = MerkleProofBytes::deserialize(&merkle_proof_bytes_serialized)
            .context("Failed to deserialize merkle proof bytes")?;
        let merkle_proof = MerkleProof::from_bytes_le(&merkle_proof_bytes)
            .context("Failed to deserialize merkle proof")?;

        // Compute the efficient ECDSA inputs
        // TODO: Generalize recover_pk_efficient
        let (U, T) = recover_pk_efficient(msg_hash_biguint, r, false)
            .context("Failed to recover the PK!")?;

        let efficient_ecdsa =
            EfficientECDSAInputs::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(s, T, U);

        let eth_membership_inputs = EthMembershipInputs::<
            secp256k1::Fp,
            secp256k1::Fq,
            Secp256k1Affine,
        >::new(efficient_ecdsa, merkle_proof);

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit =
            EthMembershipCircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
                &halo2_wasm,
                eth_membership_inputs,
            )?;

        circuit.verify_membership();

        halo2_wasm.set_instances(&circuit.instances, INSTANCE_COL);

        halo2_wasm.assign_instances();

        let params = ParamsKZG::<Bn256>::setup(K, OsRng);

        // Load params
        halo2_wasm.load_params(&serialize_params_to_bytes(&params));

        // Generate VK
        halo2_wasm.gen_vk();

        // Generate PK
        halo2_wasm.gen_pk();

        let start = Instant::now();

        // Time tracking for proof generation
        let proof_start = Instant::now();

        // Generate proof
        // Get the public instance inputs
        let instances = halo2_wasm.get_instance_values_ext(INSTANCE_COL)?;

        let proof: Vec<u8> = halo2_wasm.prove_ext(&params);

        // Verify proof
        let is_verified = halo2_wasm.verify_ext(&instances, &proof, params)?;

        let proof_duration = proof_start.elapsed();
        println!(
            "Eth Membership Proof generation executed in: {:.2?} seconds",
            proof_duration
        );

        let duration = start.elapsed();
        let duration_in_minutes = duration.as_secs_f64() / 60.0;
        println!("Test executed in: {:.2?} seconds", duration);
        println!("Test executed in: {:.2?} minutes", duration_in_minutes);

        Ok(())
    }

    #[test]
    fn test_eff_ecdsa_verify() -> Result<()> {
        let path = "configs/eth_membership.config";
        let circuit_params: CircuitConfig = serde_json::from_reader(
            File::open(path)
                .map_err(|e| anyhow!(e))
                .with_context(|| format!("The circuit config file does not exist: {}", path))?,
        )
        .map_err(|e| anyhow!(e))
        .with_context(|| format!("Failed to read the circuit config file: {}", path))?;

        let (ecdsa_inputs, test_inputs) = mock_eff_ecdsa_input(PRIV_KEY)?;

        let merkle_proof = mock_merkle_proof_2(&test_inputs.pk)?;

        let eth_membership_inputs = EthMembershipInputs::<
            secp256k1::Fp,
            secp256k1::Fq,
            Secp256k1Affine,
        >::new(ecdsa_inputs, merkle_proof);

        let mut halo2_wasm = Halo2Wasm::new();

        halo2_wasm.config(circuit_params);

        let mut circuit =
            EthMembershipCircuit::<secp256k1::Fp, secp256k1::Fq, Secp256k1Affine>::new(
                &halo2_wasm,
                eth_membership_inputs,
            )?;

        circuit.verify_membership();

        let params = ParamsKZG::<E>::setup(K, OsRng);

        // Load params
        halo2_wasm.load_params(&serialize_params_to_bytes(&params));

        // Generate VK
        halo2_wasm.gen_vk();

        // Generate PK
        halo2_wasm.gen_pk();

        // Get the public instance inputs
        let instances = halo2_wasm.get_instance_values_ext(INSTANCE_COL)?;

        let start = Instant::now();

        // Verify Eff ECDSA
        println!("Verifying Eff ECDSA Proof");

        let is_eff_ecdsa_valid = verify_efficient_ecdsa(
            test_inputs.msg_hash,
            test_inputs.r,
            test_inputs.is_y_odd,
            &instances,
        )?;

        println!("- Is Eff ECDSA valid? {}", is_eff_ecdsa_valid);

        assert!(is_eff_ecdsa_valid, "Eff ECDSA is not valid");

        let duration = start.elapsed();
        let duration_in_minutes = duration.as_secs_f64() / 60.0;
        println!("Test executed in: {:.2?} seconds", duration);
        println!("Test executed in: {:.2?} minutes", duration_in_minutes);

        Ok(())
    }
}
