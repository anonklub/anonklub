import { type GenerateMerkleProofFn, MerkleTreeWorker } from '@anonklub/merkle-tree-worker'
import { useWorker } from './useWorker'

export const useMerkleTreeWasmWorker = () => {
  const isWorkerReady = useWorker(MerkleTreeWorker)

  const generateMerkleProof: GenerateMerkleProofFn = async (
    leaves,
    leaf,
    depth,
  ): Promise<Uint8Array> => {
    process.env.NODE_ENV === 'development' && console.time('==>merkle')

    try {
      const proof = await MerkleTreeWorker.generateMerkleProof(
        leaves,
        leaf,
        depth,
      )

      process.env.NODE_ENV === 'development' && console.timeEnd('==>merkle')
      return proof
    } catch (error) {
      throw error
    }
  }

  return {
    generateMerkleProof,
    isWorkerReady,
  }
}
