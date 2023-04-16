import { writeFileSync } from 'fs'
import { execSync } from 'child_process'

export const verify = async (pathOrUrl: string) => {
  let proof: string
  if (pathOrUrl.startsWith('http')) {
    const json = await fetch(pathOrUrl).then(async (res) => res.json())
    writeFileSync('proof.json', json)
    proof = 'proof.json'
  } else if (pathOrUrl.endsWith('.json')) {
    proof = pathOrUrl
  } else {
    throw new Error('invalid path or url')
  }

  execSync(
    `snarkjs groth16 verify verification_key.json public.json proof.json`,
  )
}
