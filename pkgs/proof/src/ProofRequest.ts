interface ProofRequestArgs {
  addresses: string[]
  merkleProof: Uint8Array
  message: string
  rawSignature: string
}

export default class ProofRequest {
  public readonly addresses: string[]
  public readonly message: string
  public readonly merkleProof: Uint8Array
  public readonly rawSignature: string

  constructor({
    addresses,
    merkleProof,
    message,
    rawSignature,
  }: ProofRequestArgs) {
    // TODO: validate params
    this.addresses = addresses
    this.message = message
    this.merkleProof = merkleProof
    this.rawSignature = rawSignature
  }
}
