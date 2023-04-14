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
