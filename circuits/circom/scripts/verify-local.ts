import { groth16 } from 'snarkjs'
import {
  askProofFile,
  askPublicSignalsFile,
  askVerificationKeyFile,
} from './_prompt'
import { wrapExec } from './_wrap'

const main = async () => {
  const proof = await askProofFile()
  const publicSignals = await askPublicSignalsFile()
  const verificationKey = await askVerificationKeyFile()

  const valid: boolean = await groth16.verify(
    verificationKey,
    publicSignals,
    proof,
  )
  console.log(`${valid ? '✅ valid proof' : '❌ invalid proof'}`)
}

wrapExec(main)
