import { SandboxedJob } from 'bullmq'
import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { join } from 'path'
import {
  bigintToArray,
  MerkleTree,
  ProofRequest,
  stringifyWithBigInts,
  uint8ArrayToBigint,
} from '@e2e-zk-ecdsa/shared'
import { memoPoseidon } from '../poseidon'

const PROOFS_DIR = join('public', 'proofs')

module.exports = async (job: SandboxedJob) => {
  const poseidon = await memoPoseidon()
  const request = ProofRequest.fromReq(job.data)
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
  console.log('circuitInput', circuitInput)
  execSync(`mkdir -p ${PROOFS_DIR}/${job.id}`)
  console.log('created dir')
  writeFileSync(
    `./${PROOFS_DIR}/${job.id}/input.json`,
    stringifyWithBigInts(circuitInput),
  )
  console.log('wrote input.json')
  await job.updateProgress(1)
  //
  // // TODO: probably don't have to call this as a separate command, this is just how the code is generated from circom
  // execSync(
  //   `node ./generated/generate_witness.js ./generated/main.wasm ./${PROOFS_DIR}/${job.id}/input.json ./${PROOFS_DIR}/${job.id}/witness.wtns`,
  // )
  // await job.updateProgress(20)
  // execSync(
  //   `snarkjs groth16 prove ./circuit_0001.zkey ./${PROOFS_DIR}/${job.id}/witness.wtns ./${PROOFS_DIR}/${job.id}/proof.json ./${PROOFS_DIR}/${job.id}/public.json`,
  // )
  await job.updateProgress(100)
}
