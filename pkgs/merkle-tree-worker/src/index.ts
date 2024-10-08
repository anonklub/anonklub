import { type Remote, wrap } from 'comlink'
import type { IMerkleTreeWorker } from './interface'

let MerkleTreeWorker: Remote<IMerkleTreeWorker>

if (typeof window !== 'undefined') {
  MerkleTreeWorker = wrap<IMerkleTreeWorker>(
    new Worker(new URL('./worker.js', import.meta.url)),
  )
}

export { type GenerateMerkleProofFn } from './interface'
export { MerkleTreeWorker }
