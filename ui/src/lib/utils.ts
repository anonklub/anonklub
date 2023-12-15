import { Hex } from 'viem';

// Append the "0x" prefix to the string if it doesn't have it
export const toPrefixedHex = (str: String): Hex => {
  return (str.includes('0x') ? str : '0x' + str) as Hex;
};
