import { buildPoseidon } from 'circomlibjs'

let poseidon: any

export const getMemoPoseidon = async () => {
  if (poseidon !== undefined)
    return poseidon
  poseidon = await buildPoseidon()
  return poseidon
}
