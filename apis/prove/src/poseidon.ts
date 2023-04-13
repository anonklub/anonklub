import { buildPoseidon } from 'circomlibjs'

let poseidon: any

export async function memoPoseidon() {
  if (poseidon === undefined) poseidon = await buildPoseidon()
  return poseidon
}
