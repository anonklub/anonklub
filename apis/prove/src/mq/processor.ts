import { SandboxedJob } from 'bullmq'
import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { groth16 } from 'snarkjs'
import {
  CircuitInput,
  getMemoPoseidon,
  ProofRequestJson,
} from '@anonset/membership'

const ROOT_DIR = join(__dirname, '..', '..')
const PROOFS_DIR = join(ROOT_DIR, 'public', 'proofs')
const GENERATED_DIR = join(ROOT_DIR, 'generated')

const createDir = (jobId: string) => {
  execSync(`mkdir -p ${PROOFS_DIR}/${jobId}`)
  console.log('created dir')
}

const writeInput = (jobId: string, circuitInput: CircuitInput) => {
  writeFileSync(`${PROOFS_DIR}/${jobId}/input.json`, circuitInput.serialize())
  console.log('wrote input.json')
}

const generateProof = async ({
  circuitInput,
  jobId,
}: {
  circuitInput: CircuitInput
  jobId: string
}) => {
  const { proof, publicSignals } = await groth16.fullProve(
    circuitInput,
    join(GENERATED_DIR, 'main.wasm'),
    join(GENERATED_DIR, 'circuit.zkey'),
  )

  writeFileSync(join(PROOFS_DIR, jobId, 'proof.json'), JSON.stringify(proof))
  writeFileSync(
    join(PROOFS_DIR, jobId, 'public.json'),
    JSON.stringify(publicSignals),
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
  await job.updateProgress(1)

  writeInput(job.id, circuitInput)
  await job.updateProgress(2)

  await generateProof({ circuitInput, jobId: job.id })
  await job.updateProgress(100)

  // TODO: add expiration queue to remove files after a certain amount of time or when they were fetched
}
