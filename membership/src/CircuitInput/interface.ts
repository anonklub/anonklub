import { ProofRequest } from '../ProofRequest'

export interface CircuitInputArgs {
  proofRequest: ProofRequest
  /**
   *
   * @param Hash Function used by the Merkle Tree underlying the Circuit Input/Proof
   */
  hashFunction: (any) => any // TODO: make it more specific
}

export interface CircuitInputInterface {
  serialize: () => string
}
