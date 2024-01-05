import { useCallback, useEffect, useState } from 'react';
import { Hex, bytesToHex, hashMessage, hexToBytes, hexToSignature } from 'viem';
import { MerkleTreeInput, merkleTreeWorker } from '@/lib/merkle-tree-worker';
import * as Comlink from 'comlink';

// Web worker to run proving and verification
let worker: Comlink.Remote<typeof merkleTreeWorker>;

export const useMerkleTreeWasmWorker = () => {
    const [proving, setProving] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            worker = Comlink.wrap(new Worker(new URL("../lib/merkle-tree-worker.ts", import.meta.url)));
            console.log('Preparing circuit');
            await worker.prepare();
        })();
    }, []);

    const generateMerkleProof = async ({
        leaves,
        leaf,
        depth
    }: MerkleTreeInput): Promise<Uint8Array> => {
        console.time('==>merkle');
        const proof = await worker.generate_merkle_proof({
            leaves,
            leaf,
            depth
        });
        console.timeEnd('==>merkle');

        return proof;
    };

    return {
        generateMerkleProof,
    }
}

