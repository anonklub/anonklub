import * as Comlink from 'comlink';

export interface MerkleProof {
    root: bigint;
    pathIndices: number[];
    siblings: [bigint][];
}

export interface MerkleTreeInput {
    leaves: string[],
    leaf: string,
    depth: number
}

let merkleTreeWasm: any;

export const merkleTreeWorker = {
    async prepare() {
        merkleTreeWasm = await import("@anonklub/merkle-tree-wasm");
        console.log("Circuit", merkleTreeWasm);
    },

    async generate_merkle_proof({
        leaves,
        leaf,
        depth
    }: MerkleTreeInput): Promise<Uint8Array> {
        const proof = await merkleTreeWasm.generate_merkle_proof(
            leaves,
            leaf,
            depth
        );

        return proof;
    },
}

Comlink.expose(merkleTreeWorker);
