export interface ProofRequestArgs {
  addresses: string[]
  message: string
  rawSignature: string
  /**
   * Endpoint of the remote server that will process the proofs
   * @param url
   */
  url: string
}

// TODO: make it more specific
export interface Proof {
  proof: any
  publicSignals: any
}

export interface ProofRequestInterface {
  submit: () => Promise<void>
  getResult: () => Promise<Proof>
  serialize: () => string
}
