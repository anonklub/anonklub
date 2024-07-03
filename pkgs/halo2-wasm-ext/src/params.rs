use halo2_base::halo2_proofs::poly::kzg::commitment::ParamsKZG;
use rand_core::OsRng;

pub fn gen_params(k: u32) -> ParamsKZG<E> {
    // Generate Params based on the circuit stats
    ParamsKZG::<E>::setup(k, OsRng)
}

pub fn serialize_params_to_bytes(params: &ParamsKZG<E>) -> Vec<u8> {
    let mut buf = Vec::new();
    let mut cursor = Cursor::new(&mut buf);

    params.write(&mut cursor).expect("Serialization failed");

    buf
}
