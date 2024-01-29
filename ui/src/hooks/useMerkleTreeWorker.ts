import { useEffect } from 'react'
import {
  GenerateMerkleProofFn,
  MerkleTreeWorker,
} from '@anonklub/merkle-tree-worker'

export const useMerkleTreeWasmWorker = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      await MerkleTreeWorker.prepare()
    })()
  }, [])

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
  }
}
