import { hashLevel, maxAddress, minAddress } from './helpers'

// Merkle tree of a specified depth padded with zeroes.
// One zero is added per layer at most, so we can create very deep trees with few elements,
// meaning that we can efficiently make merkle proofs for many sizes of sets, while using a single circuit.
export class MerkleTree {
	depth: number
	levels: bigint[][]

	constructor(elements: bigint[], depth: number, hashFunction, field) {
		if (elements.length > Math.pow(2, depth)) {
			throw new Error(
				`Merkle tree depth ${depth} is too small for ${elements.length} items`,
			)
		}

		for (let i = 0; i < elements.length; i++) {
			const element = elements[i]
			if (element < minAddress || element > maxAddress) {
				throw new Error(
					`Element number ${i} with value ${element} is out of range`,
				)
			}
		}

		this.depth = depth
		this.levels = []
		this.levels[0] = elements

		for (let i = 1; i < depth; i++) {
			this.levels[i] = hashLevel(this.levels[i - 1], hashFunction, field)
		}
	}

	root(): bigint {
		return this.levels[this.levels.length - 1][0]
	}

	merkleProof(index: number): {
		pathIndices: number[]
		pathElements: bigint[]
	} {
		const pathIndices: number[] = []
		const pathElements: bigint[] = []
		for (let i = 0; i < this.depth - 1; i++) {
			pathIndices.push(index & 1)
			pathElements.push(this.levels[i][index % 2 === 0 ? index + 1 : index - 1])
			if (typeof pathElements[pathElements.length - 1] === 'undefined') {
				pathElements[pathElements.length - 1] = 0n
			}
			index = index >> 1
		}
		return { pathElements, pathIndices }
	}
}
