import { expose } from 'comlink'
import { IMerkleTreeWasm, IMerkleTreeWorker } from './interface'

let merkleTreeWasm: IMerkleTreeWasm

export const merkleTreeWorker: IMerkleTreeWorker = {
  async prepare() {
    merkleTreeWasm = await import('@anonklub/merkle-tree-wasm')
  },

  generateMerkleProof(leaves, leaf, depth): Uint8Array {
    return merkleTreeWasm.generate_merkle_proof(leaves, leaf, depth)
  },
}

expose(merkleTreeWorker)
