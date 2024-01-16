import { Hex, hexToBytes } from "viem";

// Ref: https://github.com/ethereumjs/ethereumjs-monorepo/blob/8ca49a1c346eb7aa61acf550f8fe213445ef71ab/packages/util/src/signature.ts#L46
// Returns if y is odd or not
export function calculateSigRecovery(v: bigint, chainId?: bigint): boolean {
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
export function concatUint8Arrays(arrays: Uint8Array[]) {
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

// Append the "0x" prefix to the string if it doesn't have it
const toPrefixedHex = (str: String): Hex => {
  return (str.includes('0x') ? str : '0x' + str) as Hex;
};

export const bigIntToBytes = (x: bigint): Uint8Array => {
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