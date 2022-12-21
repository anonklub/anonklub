// Merkle tree of a specified depth padded with zeroes.
// One zero is added per layer at most, so we can create very deep trees with few elements,
// meaning that we can efficiently make merkle proofs for many sizes of sets, while using a single circuit.
export class MerkleTree {
  depth: number;
  levels: BigInt[][];

  constructor(elements: BigInt[], depth: number, hashFunction, field){
    if (elements.length > Math.pow(2, depth)) {
      throw new Error(`Merkle tree depth ${depth} is too small for ${elements.length} items`);
    }

    this.depth = depth;
    this.levels = Array();
    this.levels[0] = elements;
    for (let i = 1; i < depth; i++) {
      this.levels[i] = hashLevel(this.levels[i-1], hashFunction, field);
    }
  }

  root(): BigInt {
    return this.levels[this.levels.length-1][0];
  }

  merkleProof(index: number):{pathIndices: number[], pathElements: BigInt[]} {
    let pathIndices: number[] = Array();
    let pathElements: BigInt[] = Array();
    for (let i = 0; i < this.depth-1; i++) {
      pathIndices.push(index & 1);
      pathElements.push(this.levels[i][index % 2 == 0 ? index+1 : index-1]);
      index = index >> 1;
    }
    return {pathIndices, pathElements};
  }
}

function hashLevel(level: BigInt[], h, f):BigInt[] {
  let nextLevel: BigInt[] = Array();
  for (let i = 0; i < level.length; i+=2) {
    if (i+1 === level.length) {
      nextLevel.push(f.toObject(h([level[i], 0])));
    } else {
      nextLevel.push(f.toObject(h([level[i], level[i+1]])));
    }
  }
  return nextLevel;
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
