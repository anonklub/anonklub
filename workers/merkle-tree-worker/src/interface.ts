import type { generate_merkle_proof } from "@anonklub/merkle-tree-wasm";

export type GenerateMerkleProofFn = (leaves: string[], leaf: string, depth: number) => Promise<Uint8Array>;

export interface IMerkleTreeWorker {
    prepare: () => void;
    generateMerkleProof: GenerateMerkleProofFn;
}

export interface IMerkleTreeWasm {
    generate_merkle_proof: typeof generate_merkle_proof
}