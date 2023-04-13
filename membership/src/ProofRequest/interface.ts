export interface ProofRequestArgs {
  addresses: string[]
  message: string
  rawSignature: string
}

// TODO: make it more specific
export interface Proof {
  proof: any
  publicSignals: any
}

export interface ProofRequestInterface {
  submit: () => Promise<string>
  getResult: () => Promise<Proof>
}
