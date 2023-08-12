import { groth16 } from 'snarkjs'
import { Groth16VerifierAbi } from '@anonklub/contracts'
import verificationKey from '../../generated/verification_key.json'
import { publicClient } from '../public-client'
import { ProofData, ProofI, PublicSignalsData } from './interface'

export class Proof implements ProofI {
  public readonly publicSignals: PublicSignalsData
  private readonly proof: ProofData

  constructor({
    proof,
    publicSignals,
  }: {
    proof: ProofData
    publicSignals: PublicSignalsData
  }) {
    this.proof = proof
    this.publicSignals = publicSignals
  }

  async verify(on: 'onchain' | 'offchain') {
    return on === 'onchain'
      ? await this._verifyOnChain()
      : await this._verifyOffChain()
  }

  private async _verifyOffChain() {
    return await groth16.verify(verificationKey, this.publicSignals, this.proof)
  }

  private async _verifyOnChain() {
    const args = await groth16.exportSolidityCallData(
      this.proof,
      this.publicSignals,
    )

    console.log({
      args,
      publicClient,
      Groth16VerifierAbi,
    })
    const valid = await publicClient.readContract({
      abi: Groth16VerifierAbi,
      address: '0x893f293e3918a179bf87fb772206e9927db61b0c',
      args,
      functionName: 'verifyProof',
    })

    console.log(`${valid ? '✅ valid proof' : '❌ invalid proof'}`)
    return valid
  }
}
