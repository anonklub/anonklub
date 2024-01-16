import { expose } from "comlink";
import { IMerkleTreeWasm, IMerkleTreeWorker } from "./interface";

let merkleTreeWasm: IMerkleTreeWasm;

export const merkleTreeWorker: IMerkleTreeWorker = {
    async prepare() {
        merkleTreeWasm = await import("@anonklub/merkle-tree-wasm");
    },

    async generateMerkleProof(
        leaves,
        leaf,
        depth
    ): Promise<Uint8Array> {
        const proof = await merkleTreeWasm.generate_merkle_proof(
            leaves,
            leaf,
            depth
        );

        return proof;
    },
}

expose(merkleTreeWorker);
