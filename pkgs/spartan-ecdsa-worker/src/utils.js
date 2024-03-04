// Ref: https://github.com/ethereumjs/ethereumjs-monorepo/blob/8ca49a1c346eb7aa61acf550f8fe213445ef71ab/packages/util/src/signature.ts#L46
// Returns if y is odd or not
export function calculateSigRecovery(v, chainId) {
    if (v === BigInt(0) || v === BigInt(1)) {
        return v !== BigInt(1);
    }
    if (chainId === undefined) {
        return v === BigInt(27);
    }
    return v === chainId * BigInt(2) + BigInt(35);
}
