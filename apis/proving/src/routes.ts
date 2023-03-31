import { execSync } from 'child_process'
import { Router } from 'express'
import { readFileSync, rmSync, writeFileSync } from 'fs'
import { CircuitInput, memoPoseidon } from '@e2e-zk-ecdsa/shared'

export const provingRouter = Router().post('/', async (req, res) => {
  const proofRequest = req.body
  console.log('received proof request', proofRequest)
  const poseidon = await memoPoseidon()
  const circuitInput = new CircuitInput({
    poseidon,
    proofRequest,
  })
  console.log('circuitInput', circuitInput)

  writeFileSync('./input.json', circuitInput.serialize())

  // TODO: probably don't have to call this as a separate command, this is just how the code is generated from circom
  execSync(
    'node ./generated/generate_witness.js ./generated/main.wasm ./input.json ./witness.wtns',
  )
  execSync(
    'snarkjs groth16 prove ./circuit_0001.zkey ./witness.wtns ./proof.json ./public.json',
  )
  res.send({
    proof: readFileSync('./proof.json').toString(),
    public: readFileSync('./public.json').toString(),
  })
  rmSync('./witness.wtns')
  rmSync('./input.json')
  rmSync('./proof.json')
  rmSync('./public.json')
})
