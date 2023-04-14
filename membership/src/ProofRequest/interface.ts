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
export interface ProofResult {
  proof: any
  publicSignals: any
}

export type ProofRequestJson = Omit<ProofRequestArgs, 'url'>

export interface ProofRequestInterface {
  submit: () => Promise<void>
  getResult: () => Promise<ProofResult>
}
