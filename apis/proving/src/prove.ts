import { execSync } from 'child_process'
import { buildPoseidon } from 'circomlibjs'
import { rmSync, writeFileSync } from 'fs'
import {
  bigintToArray,
  MerkleTree,
  uint8ArrayToBigint,
} from '@e2e-zk-ecdsa/shared'
import { ProofRequest, stringifyWithBigInts } from './interface'

const generateWitness = () =>
  execSync(
    'node ./generated/generate_witness.js ./generated/main.wasm ./input.json ./witness.wtns',
  )

const prove = () =>
  execSync(
    'snarkjs groth16 prove ./circuit_0001.zkey ./witness.wtns ./proof.json ./public.json',
  )
const cleanUp = () => {
  rmSync('./witness.wtns')
  rmSync('./input.json')
  rmSync('./proof.json')
  rmSync('./public.json')
}
const poseidonPromise = buildPoseidon()

export async function processProofRequest(proofRequest: any): Promise<Proof> {
  const request = ProofRequest.fromReq(proofRequest)
  const poseidon = await poseidonPromise

  const tree = new MerkleTree(request.addresses, 21, poseidon, poseidon.F)
  const merkleProof = tree.merkleProof(request.addressIndex)

  const circuitInput = {
    msghash: bigintToArray(64, 4, request.msghash),
    pathElements: merkleProof.pathElements,
    pathIndices: merkleProof.pathIndices,
    pubkey: [
      bigintToArray(64, 4, request.pubkey.x),
      bigintToArray(64, 4, request.pubkey.y),
    ],
    r: bigintToArray(64, 4, uint8ArrayToBigint(request.signature.slice(0, 32))),
    root: tree.root(),
    s: bigintToArray(
      64,
      4,
      uint8ArrayToBigint(request.signature.slice(32, 64)),
    ),
  }

  writeFileSync('./input.json', stringifyWithBigInts(circuitInput))

  // TODO: probably don't have to call this as a separate command, this is just how the code is generated from circom
  generateWitness()
  prove()
  cleanUp()
}
