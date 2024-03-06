import { expose } from 'comlink'
import { IMerkleTreeWasm, IMerkleTreeWorker } from './interface'

let merkleTreeWasm: IMerkleTreeWasm

export const merkleTreeWorker: IMerkleTreeWorker = {
  async generateMerkleProof(leaves, leaf, depth): Promise<Uint8Array> {
    // eslint-disable-next-line no-useless-catch
    try {
      // eslint-disable-next-line  @typescript-eslint/await-thenable
      const result = await merkleTreeWasm.generate_merkle_proof(
        leaves,
        leaf,
        depth,
      )
      return result
    } catch (error) {
      throw error
    }
  },

  async prepare() {
    merkleTreeWasm = await import('@anonklub/merkle-tree-wasm')
  },
}

expose(merkleTreeWorker)
