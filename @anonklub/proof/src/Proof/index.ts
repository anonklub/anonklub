import snarkjs from 'snarkjs'
import verificationKey from '../../generated/verification_key.json'
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
    return await snarkjs.groth16.verify(
      verificationKey,
      this.publicSignals,
      this.proof,
    )
  }

  private async _verifyOnChain() {
    return 'Implement me!'
  }
}
