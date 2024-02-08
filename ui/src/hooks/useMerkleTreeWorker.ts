import {
  GenerateMerkleProofFn,
  MerkleTreeWorker,
} from '@anonklub/merkle-tree-worker'
import { useWorker } from '@/hooks'

export const useMerkleTreeWasmWorker = () => {
  const isWorkerReady = useWorker(MerkleTreeWorker)

  const generateMerkleProof: GenerateMerkleProofFn = async (
    leaves,
    leaf,
    depth,
  ): Promise<Uint8Array> => {
    console.time('==>merkle')
    const proof = await MerkleTreeWorker.generateMerkleProof(
      leaves,
      leaf,
      depth,
    )
    console.timeEnd('==>merkle')
    return proof
  }

  return {
    generateMerkleProof,
    isWorkerReady,
  }
}
