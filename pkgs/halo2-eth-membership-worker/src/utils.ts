// Ref: https://github.com/ethereumjs/ethereumjs-monorepo/blob/8ca49a1c346eb7aa61acf550f8fe213445ef71ab/packages/util/src/signature.ts#L46

import { hexToBytes } from "viem";

// Returns if y is odd or not
export function calculateSigRecovery(v: bigint, chainId?: bigint): boolean {
  if (v === BigInt(0) || v === BigInt(1)) {
    return v !== BigInt(1)
  }

  if (chainId === undefined) {
    return v === BigInt(27)
  }
  return v === chainId * BigInt(2) + BigInt(35)
}

export function hexToLittleEndianBytes(hex, size) {
  let bytes = hexToBytes(hex);

  // Ensure the byte array is the correct size
  if (bytes.length < size) {
    // If the byte array is too short, pad with zeros at the end (little-endian)
    bytes = new Uint8Array([...bytes, ...new Uint8Array(size - bytes.length)]);
  } else if (bytes.length > size) {
    // If the byte array is too long, truncate it
    bytes = bytes.slice(0, size);
  }

  // Reverse the byte order for little-endian
  return new Uint8Array(bytes).reverse();
}

export const fetchKzgParams = async (k: number) => {
  const response = await fetch(
    `https://halo2-ecdsa-params.s3.us-east-2.amazonaws.com/params_${k}.bin`
  );
  const bytes = await response.arrayBuffer();

  const params = new Uint8Array(bytes);
  return params;
};
