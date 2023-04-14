import { SandboxedJob } from 'bullmq'
import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { join } from 'path'
import {
  CircuitInput,
  getMemoPoseidon,
  ProofRequestJson,
} from '@anonset/membership'

const PROOFS_DIR = join(__dirname, '..', '..', 'public', 'proofs')
const GENERATED_DIR = join(__dirname, '..', '..', 'generated')

const createDir = (jobId: string) => {
  execSync(`mkdir -p ${PROOFS_DIR}/${jobId}`)
  console.log('created dir')
}

const writeInput = (jobId: string, circuitInput: CircuitInput) => {
  writeFileSync(`${PROOFS_DIR}/${jobId}/input.json`, circuitInput.serialize())
  console.log('wrote input.json')
}

const generateWitness = (jobId: string) => {
  // TODO: probably don't have to call this as a separate command, this is just how the code is generated from circom
  execSync(
    `node ${GENERATED_DIR}/generate_witness.js ${GENERATED_DIR}/main.wasm ${PROOFS_DIR}/${jobId}/input.json ${PROOFS_DIR}/${jobId}/witness.wtns`,
  )
  console.log('generated witness')
}

const generateProof = (jobId: string) => {
  execSync(
    `snarkjs groth16 prove ${GENERATED_DIR}/circuit_0001.zkey ${PROOFS_DIR}/${jobId}/witness.wtns ${PROOFS_DIR}/${jobId}/proof.json ${PROOFS_DIR}/${jobId}/public.json`,
  )
}

// TODO: check somewhere presence and integrity of required zkey file, don't run the heavy computing otherwise

// need to use module.exports syntax for bullmq sandboxed jobs to work https://docs.bullmq.io/guide/workers/sandboxed-processors
module.exports = async (job: SandboxedJob<ProofRequestJson>) => {
  const poseidon = await getMemoPoseidon()
  const circuitInput: CircuitInput = new CircuitInput({
    field: poseidon.F,
    hashFunction: poseidon,
    proofRequest: job.data,
  })

  createDir(job.id)
  writeInput(job.id, circuitInput)

  await job.updateProgress(2)

  generateWitness(job.id)
  await job.updateProgress(20)

  generateProof(job.id)
  await job.updateProgress(100)

  // TODO: add expiration queue to remove files after a certain amount of time or when they were fetched
}
