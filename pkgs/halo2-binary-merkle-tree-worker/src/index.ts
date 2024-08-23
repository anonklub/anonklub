import { type Remote, wrap } from 'comlink'
import type { IHalo2BinaryMerkleTree } from './interface'

let Halo2BinaryMerkleTreeWorker: Remote<IHalo2BinaryMerkleTree>

if (typeof window !== 'undefined') {
  Halo2BinaryMerkleTreeWorker = wrap<IHalo2BinaryMerkleTree>(
    new Worker(new URL('./worker.js', import.meta.url)),
  )
}

export { type GenerateMerkleProofFn } from './interface'
export { Halo2BinaryMerkleTreeWorker }
