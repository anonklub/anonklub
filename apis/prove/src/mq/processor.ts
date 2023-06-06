import { SandboxedJob } from 'bullmq'
import { mkdirSync, writeFileSync } from 'fs'
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

const createDir = async (job: SandboxedJob<ProofRequestJson>) => {
  mkdirSync(join(PROOFS_DIR, job.id), { recursive: true })
  await job.updateProgress(1)
  console.log('created dir')
}

const writeInput = async (
  job: SandboxedJob<ProofRequestJson>,
  circuitInput: CircuitInput,
) => {
  writeFileSync(
    join(PROOFS_DIR, job.id, 'input.json'),
    circuitInput.serialize(),
  )
  await job.updateProgress(2)
  console.log('wrote input.json')
}

const generateProof = async ({
  circuitInput,
  job,
}: {
  circuitInput: CircuitInput
  job: SandboxedJob<ProofRequestJson>
}) => {
  console.log('generating proof')
  const { proof, publicSignals } = await groth16.fullProve(
    circuitInput,
    join(GENERATED_DIR, 'main.wasm'),
    join(GENERATED_DIR, 'circuit.zkey'),
  )

  await job.updateProgress(100)
  writeFileSync(join(PROOFS_DIR, job.id, 'proof.json'), JSON.stringify(proof))
  writeFileSync(
    join(PROOFS_DIR, job.id, 'public.json'),
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

  await createDir(job)
  await writeInput(job, circuitInput)
  await generateProof({ circuitInput, job })

  // TODO: add expiration queue to remove files after a certain amount of time or when they were fetched
}
