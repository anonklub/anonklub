import { useEffect } from 'react'
import {
  GenerateMerkleProofFn,
  MerkleTreeWorker,
} from '@anonklub/merkle-tree-worker'

export const useMerkleTreeWasmWorker = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        await MerkleTreeWorker.prepare()
      } catch (error) {
        throw new Error(error)
      }
    })()
  }, [])

  const generateMerkleProof: GenerateMerkleProofFn = async (
    leaves,
    leaf,
    depth,
  ): Promise<Uint8Array> => {
    try {
      console.time('==>merkle')
      const proof = await MerkleTreeWorker.generateMerkleProof(
        leaves,
        leaf,
        depth,
      )
      console.timeEnd('==>merkle')

      return proof
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    generateMerkleProof,
  }
}
