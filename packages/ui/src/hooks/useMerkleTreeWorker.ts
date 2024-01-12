import { useEffect } from "react";
import { Remote } from "comlink";
import { MerkleTreeWorker, GenerateMerkleProofFn } from "@anonklub/merkle-tree-worker";

export const useMerkleTreeWasmWorker = () => {
    let worker: Remote<typeof MerkleTreeWorker>;

    useEffect(() => {
        (async () => {
            await MerkleTreeWorker.prepare();
        })();
    }, []);

    const generateMerkleProof: GenerateMerkleProofFn = async (
        leaves,
        leaf,
        depth
    ): Promise<Uint8Array> => {

        console.time('==>merkle');
        const proof = await MerkleTreeWorker.generateMerkleProof(
            leaves,
            leaf,
            depth
        );
        console.timeEnd('==>merkle');

        return proof;
    };

    return {
        generateMerkleProof,
    }
}
