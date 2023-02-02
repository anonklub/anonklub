export const minAddress = 0n
export const maxAddress = 2n ** 160n - 1n

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
      index = index >> 1
    }
    return { pathElements, pathIndices }
  }
}

export class ExcludableMerkleTree extends MerkleTree {
  constructor(elements: bigint[], depth: number, hashFunction, field) {
    // Exclusion works by proving merkle proofs for two adjacent values on a sorted list, such that the
    // element being proven should fall between them.
    // So we have to sort the list for soundess, and add min and max values to the end of the list
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

function hashLevel(level: bigint[], h, f): bigint[] {
  const nextLevel: bigint[] = []
  for (let i = 0; i < level.length; i += 2) {
    if (i + 1 === level.length) {
      nextLevel.push(f.toObject(h([level[i], 0])))
    } else {
      nextLevel.push(f.toObject(h([level[i], level[i + 1]])))
    }
  }
  return nextLevel
}

// TODO: import from circom-ecdsa instead

export function bigintToUint8Array(x: bigint) {
  const ret: Uint8Array = new Uint8Array(32)
  for (let idx = 31; idx >= 0; idx--) {
    ret[idx] = Number(x % 256n)
    x = x / 256n
  }
  return ret
}

// bigendian
export function uint8ArrayToBigint(x: Uint8Array) {
  let ret = 0n
  for (let idx = 0; idx < x.length; idx++) {
    ret = ret * 256n
    ret = ret + BigInt(x[idx])
  }
  return ret
}

export function bigintToArray(n: number, k: number, x: bigint) {
  let mod = 1n
  for (let idx = 0; idx < n; idx++) {
    mod = mod * 2n
  }

  const ret: bigint[] = []
  let xTemp: bigint = x
  for (let idx = 0; idx < k; idx++) {
    ret.push(xTemp % mod)
    xTemp = xTemp / mod
  }
  return ret
}
