import 'express-async-errors'
import { execSync } from 'child_process'
import { buildPoseidon } from 'circomlibjs'
import express from 'express'
import { readFileSync, rmSync, writeFileSync } from 'fs'
import {
  bigintToArray,
  MerkleTree,
  uint8ArrayToBigint,
} from '@e2e-zk-ecdsa/shared'
import { ProofRequest, stringifyWithBigInts } from './interface'

const app = express()
app.use(express.json())
const port = 3000

const poseidonPromise = buildPoseidon()
app.post('/', async (req, res) => {
  const request = ProofRequest.fromReq(req.body)
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

  writeFileSync('prover/input.json', stringifyWithBigInts(circuitInput))

  // TODO: probably don't have to call this as a separate command, this is just how the code is generated from circom
  execSync(
    'node prover/generated/generate_witness.js prover/generated/main.wasm prover/input.json prover/witness.wtns',
  )
  execSync(
    'snarkjs groth16 prove prover/circuit_0001.zkey prover/witness.wtns prover/proof.json prover/public.json',
  )
  res.send(
    readFileSync('prover/proof.json').toString() +
      readFileSync('prover/public.json').toString(),
  )
  rmSync('prover/witness.wtns')
  rmSync('prover/input.json')
  rmSync('prover/proof.json')
  rmSync('prover/public.json')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
