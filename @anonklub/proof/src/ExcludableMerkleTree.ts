import { maxAddress, minAddress } from 'helpers'
import { MerkleTree } from 'MerkleTree'

export class ExcludableMerkleTree extends MerkleTree {
  constructor(
    elements: bigint[],
    depth: number,
    hashFunction: any,
    field: any,
  ) {
    // Exclusion works by proving merkle proofs for two adjacent values on a sorted list, such that the
    // element being proven should fall between them.
    // So we have to sort the list for soundness, and add min and max values to the end of the list
    // so all possible addresses fall in the range.
    // Note that the current implementation doesn't allow one to prove exclusion for the zero address or
    // the address with the value 2^160-1, this is a relatively small trade off for simplicity.
    elements.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))

    if (elements[0] > minAddress) elements.unshift(minAddress)
    if (elements[0] < maxAddress) elements.push(maxAddress)

    super(elements, depth, hashFunction, field)
  }

  exclusionProof(nonMember: bigint): {
    leaves: [bigint, bigint]
    pathIndices: [number[], number[]]
    pathElements: [bigint[], bigint[]]
  } {
    // Find the index of the leaf that would be immediately before the non member (TODO: binary search)
    let leftLeafIndex = 0
    while (
      this.levels[0][leftLeafIndex + 1] < nonMember &&
      leftLeafIndex < this.levels[0].length
    ) {
      leftLeafIndex++
    }

    const leftLeaf = this.levels[0][leftLeafIndex]
    const rightLeaf = this.levels[0][leftLeafIndex + 1]
    if (leftLeaf >= nonMember || rightLeaf <= nonMember) {
      throw new Error(
        `Could not produce exclusion proof. Left leaf: ${leftLeaf}, right leaf: ${rightLeaf}, value: ${nonMember}`,
      )
    }

    // Calculate the paths to the leaves
    const leftProof = this.merkleProof(leftLeafIndex)
    const rightProof = this.merkleProof(leftLeafIndex + 1)

    return {
      leaves: [leftLeaf, rightLeaf],
      pathElements: [leftProof.pathElements, rightProof.pathElements],
      pathIndices: [leftProof.pathIndices, rightProof.pathIndices],
    }
  }
}
