export function parse(
  rawProof: ArrayBuffer | string | undefined | null,
): Uint8Array | string[] {
  if (rawProof === undefined || rawProof === null)
    throw new Error('Invalid input')
  if (rawProof instanceof ArrayBuffer) return new Uint8Array(rawProof)
  return JSON.parse(rawProof)
}
