import type { generate_merkle_proof, initPanicHook, initSync, initThreadPool } from '@anonklub/halo2-binary-merkle-tree'

export type GenerateMerkleProofFn = (
  leaves: string[],
  leaf: string,
  depth: number,
) => Promise<Uint8Array>

export interface IHalo2BinaryMerkleTree {
  prepare: () => Promise<void>
  generateMerkleProof: (
    leaves: string[],
    leaf: string,
    depth: number,
  ) => Promise<Uint8Array>
}

export interface IHalo2BinaryMerkleTreeWasm {
  generate_merkle_proof: typeof generate_merkle_proof
  initSync: typeof initSync
  initPanicHook: typeof initPanicHook
  initThreadPool: typeof initThreadPool
}
