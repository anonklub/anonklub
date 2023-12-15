import { MembershipProver } from "@personaelabs/spartan-ecdsa";
import { Hex, bytesToHex, hexToBytes } from "viem";
import * as Comlink from 'comlink';

export interface MerkleProof {
    root: bigint;
    pathIndices: number[];
    siblings: [bigint][];
}

export interface WitnessInput {
    s: Uint8Array;
    r: Uint8Array;
    isYOdd: boolean;
    msgHash: Uint8Array;
    siblings: Uint8Array;
    indices: Uint8Array;
    roots: Uint8Array;
}

export interface PublicInput {
    r: Uint8Array;
    isYOdd: boolean;
    msgHash: Uint8Array;
    siblings: Uint8Array;
    indices: Uint8Array;
    root: Uint8Array;
}

export interface MembershipProof {
    proofHash: string
    proof: string
    publicInput: string
    merkleRoot: string | null
    message: string
}

let circuit: any;
let initialized = false;

export const circuitWorker = {
    async prepare() {
        circuit = await import("@anonklub/spartan-circuit");
        console.log("Circuit", circuit);
        circuit.init_panic_hook();

        if (!initialized) {
            circuit.prepare();
            initialized = true;
        }
    },

    async prove({
        s,
        r,
        isYOdd,
        msgHash,
        siblings,
        indices,
        roots
    }: WitnessInput): Promise<Uint8Array> {
        const proof = await circuit.prove_membership(
            s,
            r,
            isYOdd,
            msgHash,
            siblings,
            indices,
            roots
        );

        return proof;
    }

    // const verifyMerkleProof = ({
    //     proofHash,
    //     proof,
    //     publicInput,
    //     merkleRoot,
    //     message
    // }: MembershipProof) => {
    //     const proofBytes = hexToBytes(proof as Hex);
    //     const rootsInProof: Hex[] = [bytesToHex(circuit.get_root(proofBytes))];

    //     const claimedRoots = (merkleRoot as Hex).split(',');
    //     const unprovenRoots = claimedRoots.filter((claimedRoots) => {
    //         return !rootsInProof.includes(claim)
    //     })
    // }
}

Comlink.expose(circuitWorker);
