#[cfg(test)]
mod e2e_tests {
    use anyhow::Result;
    use halo2_eth_membership::{prove_membership, verify_membership};
    use serde::Deserialize;
    use std::{collections::HashMap, fs::File, io::Read};

    const K: u32 = 15;

    #[derive(Deserialize)]
    struct ProveTestInputs {
        s: HashMap<String, u8>,
        r: HashMap<String, u8>,
        is_y_odd: bool,
        msg_hash: HashMap<String, u8>,
        merkle_proof_bytes_serialized: HashMap<String, u8>,
    }

    #[derive(Deserialize)]
    struct VerifyTestInputs {
        membership_proof: Vec<u8>,
    }

    fn map_to_vec(map: &HashMap<String, u8>) -> Vec<u8> {
        let mut vec: Vec<u8> = vec![0; map.len()];
        for (key, value) in map {
            let index: usize = key.parse().expect("Failed to parse key to usize");
            vec[index] = *value;
        }
        vec
    }

    async fn fetch_kzg_params(k: u32) -> Result<Vec<u8>> {
        let url = format!(
            "https://halo2-ecdsa-params.s3.us-east-2.amazonaws.com/params_{}.bin",
            k
        );
        let response = reqwest::get(&url).await?;

        let bytes = response.bytes().await?;
        let params = bytes.to_vec();

        Ok(params)
    }

    #[tokio::test]
    async fn test_prove_and_verify_membership_real() {
        // Read the test inputs from the JSON file
        let file = File::open("mock/prove_test_inputs.json");

        // Check if the file was opened successfully
        let mut file = match file {
            Ok(f) => f,
            Err(_) => {
                println!("Test skipped: 'mock/prove_test_inputs.json' file not found.");
                return;
            }
        };

        let mut data = String::new();
        file.read_to_string(&mut data)
            .expect("Failed to read test inputs file.");

        // Parse the JSON data
        let inputs: ProveTestInputs = serde_json::from_str(&data).expect("Failed to parse JSON.");

        // Convert HashMaps to Vec<u8>
        let s = map_to_vec(&inputs.s);
        let r = map_to_vec(&inputs.r);
        let msg_hash = map_to_vec(&inputs.msg_hash);
        let merkle_proof_bytes_serialized = map_to_vec(&inputs.merkle_proof_bytes_serialized);

        // Get KZG params
        let params = fetch_kzg_params(K).await.expect("Failed to fetch params");

        // Generate the proof
        let membership_proof = prove_membership(
            &s,
            &r,
            inputs.is_y_odd,
            &msg_hash,
            &merkle_proof_bytes_serialized,
            &params,
        );

        assert_eq!(membership_proof.is_empty(), false);

        // Verify the proof
        let is_verified = verify_membership(&membership_proof, &params);

        assert_eq!(is_verified, true);
    }

    #[tokio::test]
    async fn test_verify_membership_mock() {
        // Read the test inputs from the JSON file
        let file = File::open("mock/verify_test_inputs.json");

        // Check if the file was opened successfully
        let mut file = match file {
            Ok(f) => f,
            Err(_) => {
                println!("Test skipped: 'mock/verify_test_inputs.json' file not found.");
                return;
            }
        };

        let mut data = String::new();
        file.read_to_string(&mut data)
            .expect("Failed to read test inputs file.");

        // Parse the JSON data
        let inputs: VerifyTestInputs = serde_json::from_str(&data).expect("Failed to parse JSON.");

        // Get KZG params
        let params = fetch_kzg_params(K).await.expect("Failed to fetch params");

        // Call the function to be tested
        let result = verify_membership(&inputs.membership_proof, &params);

        // Here you can add assertions to verify the result
        assert_eq!(result, true);
    }
}
