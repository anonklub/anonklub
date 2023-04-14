import { ProofRequestJson } from '../ProofRequest/interface'

export interface CircuitInputArgs {
  proofRequest: ProofRequestJson
  /**
   *
   * @param Hash Function used by the Merkle Tree underlying the Circuit Input/Proof
   */
  hashFunction: (any) => any // TODO: make it more specific
  field: any // TODO: make it more specific
}

export interface CircuitInputInterface {
  serialize: () => string
}
