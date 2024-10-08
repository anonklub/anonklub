import { expose } from 'comlink'
import type { IHalo2BinaryMerkleTree, IHalo2BinaryMerkleTreeWasm } from './interface'

let halo2BinaryMerkleTreeWasm: IHalo2BinaryMerkleTreeWasm

export const halo2BinaryMerkleTreeWorker: IHalo2BinaryMerkleTree = {
  async generateMerkleProof(leaves, leaf, depth): Promise<Uint8Array> {
    return halo2BinaryMerkleTreeWasm.generate_merkle_proof(leaves, leaf, depth)
  },

  async prepare() {
    halo2BinaryMerkleTreeWasm = await import('@anonklub/halo2-binary-merkle-tree/dist/')

    const wasmModuleUrl = new URL('@anonklub/halo2-binary-merkle-tree/dist/index_bg.wasm', import.meta.url)
    const response = await fetch(wasmModuleUrl)
    const bufferSource = await response.arrayBuffer()

    halo2BinaryMerkleTreeWasm.initSync(bufferSource)
    halo2BinaryMerkleTreeWasm.initPanicHook()
    const numThreads = navigator.hardwareConcurrency
    await halo2BinaryMerkleTreeWasm.initThreadPool(numThreads)
  },
}

expose(halo2BinaryMerkleTreeWorker)
