// TODO: make a package of https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa/blob/main/circuits/circom/scripts/verify-onchain.ts

import { groth16 } from 'snarkjs'
import { config } from '~'
import { groth16VerifierAbi as abi } from './abis/groth16Verifier'
import { Proof, PublicSignals } from './types'
import { web3Client } from './web3-client'

export const verifyOnChain = async ({
  proof,
  publicSignals,
}: {
  proof: Proof
  publicSignals: PublicSignals
}) => {
  const callDataStr: string = await groth16.exportSolidityCallData(
    proof,
    publicSignals,
  )

  const args: [
    [bigint, bigint],
    [[bigint, bigint], [bigint, bigint]],
    [bigint, bigint],
    [bigint, bigint, bigint, bigint, bigint],
  ] = JSON.parse(`[${callDataStr}]`)

  // FIXME
  // @ts-expect-error
  return web3Client.readContract({
    abi,
    address: config.addresses.groth16Verifier,
    args,
    functionName: 'verifyProof',
  })
}
