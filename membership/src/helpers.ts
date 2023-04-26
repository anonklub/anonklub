export const minAddress = 0n
export const maxAddress = 2n ** 160n - 1n

export function hashLevel(level: bigint[], h, f): bigint[] {
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
