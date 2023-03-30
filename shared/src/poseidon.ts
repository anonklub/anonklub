import { buildPoseidon } from 'circomlibjs'

let poseidon: any

export const memoPoseidon = async () => {
  if (poseidon !== undefined) {
    return poseidon
  }
  poseidon = await buildPoseidon()
  return poseidon
}
