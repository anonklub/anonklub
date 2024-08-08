use halo2_wasm::Halo2Wasm;

pub fn set_instances(halo2_wasm: &mut Halo2Wasm, instances: Vec<u32>, col: usize) {
    halo2_wasm.set_instances(&instances, col);
    halo2_wasm.assign_instances();
}

pub fn get_instances(halo2_wasm: &mut Halo2Wasm, col: usize) -> Vec<u32> {
    halo2_wasm.get_instances(col)
}
