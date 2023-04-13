import { Proof, ProofRequestArgs, ProofRequestInterface } from './interface'

export class ProofRequest implements ProofRequestInterface {
  public readonly addresses: string[]
  public readonly message: string
  public readonly rawSignature: string

  constructor({ addresses, message, rawSignature }: ProofRequestArgs) {
    this.addresses = addresses
    this.message = message
    this.rawSignature = rawSignature
  }

  async submit(): Promise<string> {
    return 'jobid'
  }

  async getResult(): Promise<Proof> {
    // TODO: implement
    return { proof: {}, publicSignals: {} }
  }
}
