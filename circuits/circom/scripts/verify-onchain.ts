import { groth16 } from 'snarkjs'
// @ts-expect-error FIXME: abis outputs are now in contracts/
import { abi } from '../out/Groth16Verifier.sol/Groth16Verifier.json'
import { publicClient } from './_client'
import { askProofFile, askPublicSignalsFile } from './_prompt'
import { wrapExec } from './_wrap'

const main = async () => {
  const proof = await askProofFile()
  const publicSignals = await askPublicSignalsFile()

  const callDataStr: string = await groth16.exportSolidityCallData(
    proof,
    publicSignals,
  )

  const args: [string[], string[], string[], string[]] = JSON.parse(
    `[${callDataStr}]`,
  )

  const valid = await publicClient.readContract({
    abi,
    address: '0x893f293e3918a179bf87fb772206e9927db61b0c',
    args,
    functionName: 'verifyProof',
  })

  // FIXME
  console.log(
    `${(valid as unknown as boolean) ? '✅ valid proof' : '❌ invalid proof'}`,
  )
}

wrapExec(main)
