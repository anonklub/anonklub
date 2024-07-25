import {
  type GenerateMerkleProofFn,
  Halo2BinaryMerkleTreeWorker,
} from '@anonklub/halo2-binary-merkle-tree-worker'
import { useWorker } from '@/hooks/useWorker'

export const useHalo2BinaryMerkleTreeWorker = () => {
  const isWorkerReady = useWorker(Halo2BinaryMerkleTreeWorker)

  const generateMerkleProof: GenerateMerkleProofFn = async (
    leaves,
    leaf,
    depth,
  ): Promise<Uint8Array> => {
    process.env.NODE_ENV === 'development' && console.time('==>merkle')

    // eslint-disable-next-line no-useless-catch
    try {
      const proof = await Halo2BinaryMerkleTreeWorker.generateMerkleProof(
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
