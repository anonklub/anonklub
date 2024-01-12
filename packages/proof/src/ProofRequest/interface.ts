import type { MerkleProof } from "@personaelabs/spartan-ecdsa"

export interface ProofRequestArgs {
  addresses: string[]
  merkleProof: MerkleProof;
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
export interface JobResponse {
  jobId: string
  message: string
}
export interface ProofRequestInterface {
  submit: () => Promise<JobResponse>
  getResult: () => Promise<ProofResult>
}
