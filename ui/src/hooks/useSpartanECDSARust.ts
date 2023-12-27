import { useCallback, useEffect, useState } from 'react';
import { Hex, bytesToHex, hashMessage, hexToBytes, hexToSignature } from 'viem';
import { MerkleProof, WitnessInput, circuitWorker } from '@/lib/circuit-worker';
import * as Comlink from 'comlink';
import { toPrefixedHex } from '@/lib/utils';

// Web worker to run proving and verification
let circuit: Comlink.Remote<typeof circuitWorker>;

// Copied from https://github.com/ethereumjs/ethereumjs-monorepo/blob/8ca49a1c346eb7aa61acf550f8fe213445ef71ab/packages/util/src/signature.ts#L46
// Returns if y is odd or not
function calculateSigRecovery(v: bigint, chainId?: bigint): boolean {
    if (v === BigInt(0) || v === BigInt(1)) {
        return v === BigInt(1) ? false : true;
    }

    if (chainId === undefined) {
        if (v === BigInt(27)) {
            return true;
        } else {
            return false;
        }
    }
    if (v === chainId * BigInt(2) + BigInt(35)) {
        return true;
    } else {
        return false;
    }
}

// Concatenates Uint8Arrays into a single Uint8Array
function concatUint8Arrays(arrays: Uint8Array[]) {
    // Calculate combined length
    let totalLength = 0;
    for (let array of arrays) {
        totalLength += array.length;
    }

    // Create a new array with the total length
    let result = new Uint8Array(totalLength);

    // Copy each array into the result array
    let offset = 0;
    for (let array of arrays) {
        result.set(array, offset);
        offset += array.length;
    }

    return result;
}

const bigIntToBytes = (x: bigint): Uint8Array => {
    let hex = x.toString(16);
    // Truncate hex to 32 bytes if necessary
    if (hex.length > 64) {
        console.log
        hex = hex.substring(0, 64);
    } else {
        // Pad hex to be 32 bytes
        hex = hex.padStart(64, '0');
    }

    return hexToBytes(toPrefixedHex(hex), {
        size: 32,
    });
};


export const useSpartanECDSARust = () => {
    const [proving, setProving] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            circuit = Comlink.wrap(new Worker(new URL("../lib/circuit-worker.ts", import.meta.url)));
            console.log('Preparing circuit');
            await circuit.prepare();
        })();
    }, []);

    const prove = async (sig: Hex, message: string, merkleProofs: MerkleProof[]): Promise<Hex> => {
        setProving(true);
        console.log('Proving');
        const { r, s, v } = hexToSignature(sig);

        if (!circuit) {
            throw new Error('Circuit not initialized');
        }

        const sBytes = hexToBytes(s, {
            size: 32,
        });
        const rBytes = hexToBytes(r, {
            size: 32,
        });
        const isYOdd = calculateSigRecovery(v);
        const msgHash = hashMessage(message, 'bytes');
        const siblings: Uint8Array[] = [];

        for (let i = 0; i < merkleProofs.length; i++) {
            const merkleProof = merkleProofs[i];
            const merkleProofSiblings = merkleProof.siblings.map((sibling) => {
                try {
                    return bigIntToBytes(sibling[0]);
                } catch (error) {
                    console.error('Error in bigIntToBytes:', error);
                    throw new Error(error);
                }
            }).filter((sibling): sibling is Uint8Array => sibling !== undefined);

            const siblings_i = concatUint8Arrays(merkleProofSiblings);
            siblings.push(siblings_i);
        }

        const indices: Uint8Array[] = [];
        for (let i = 0; i < merkleProofs.length; i++) {
            const merkleProof = merkleProofs[i];
            const pathIndices_i = concatUint8Arrays(
                merkleProof.pathIndices.map((index) => {
                    if (index === 1) {
                        let bytes = new Uint8Array(32);
                        bytes[31] = 1;
                        return bytes;
                    }
                    return new Uint8Array(32);
                }),
            );

            indices.push(pathIndices_i);
        }

        const roots: Uint8Array[] = [];
        for (let i = 0; i < merkleProofs.length; i++) {
            const merkleProof = merkleProofs[i];
            const root_i = bigIntToBytes(merkleProof.root);
            roots.push(root_i);
        }

        console.time('prove');

        const input: WitnessInput = {
            s: sBytes,
            r: rBytes,
            isYOdd,
            msgHash,
            siblings: concatUint8Arrays(siblings),
            indices: concatUint8Arrays(indices),
            roots: concatUint8Arrays(roots),
        };

        const proof = await circuit.prove(input);
        console.timeEnd('prove');

        setProving(false);

        return bytesToHex(proof);
    };

    return {
        prove,
        proving
    }
}

