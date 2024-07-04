export const bigintify = (obj: string | string[] | string[][]) => Array.isArray(obj) ? obj.map(bigintify) : BigInt(obj)
