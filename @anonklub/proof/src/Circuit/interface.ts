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