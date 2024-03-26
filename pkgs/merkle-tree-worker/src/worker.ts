import { expose } from 'comlink'
import { IMerkleTreeWasm, IMerkleTreeWorker } from './interface'

let merkleTreeWasm: IMerkleTreeWasm

export const merkleTreeWorker: IMerkleTreeWorker = {
	async generateMerkleProof(leaves, leaf, depth): Promise<Uint8Array> {
		return merkleTreeWasm.generate_merkle_proof(leaves, leaf, depth)
	},

	async prepare() {
		merkleTreeWasm = await import('@anonklub/merkle-tree-wasm')
	},
}

expose(merkleTreeWorker)
