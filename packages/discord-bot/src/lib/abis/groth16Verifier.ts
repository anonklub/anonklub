export const groth16VerifierAbi = [
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: '_pA',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: '_pB',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: '_pC',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[5]',
        name: '_pubSignals',
        type: 'uint256[5]',
      },
    ],
    name: '_verifyProof',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: '_pA',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[2][2]',
        name: '_pB',
        type: 'uint256[2][2]',
      },
      {
        internalType: 'uint256[2]',
        name: '_pC',
        type: 'uint256[2]',
      },
      {
        internalType: 'uint256[5]',
        name: '_pubSignals',
        type: 'uint256[5]',
      },
    ],
    name: 'verifyProof',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
