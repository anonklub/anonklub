import {
  GenerateMerkleProofFn,
  MerkleTreeWorker,
} from '@anonklub/merkle-tree-worker'
import { useEffect } from 'react'

export const useMerkleTreeWasmWorker = () => {
  useEffect(() => {
    void (async () => {
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
