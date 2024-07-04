import type { init_panic_hook, prepare, prove_membership, verify_membership } from '@anonklub/spartan-ecdsa-wasm'
import type { Hex } from 'viem'

export interface MerkleProof {
  root: bigint
  pathIndices: number[]
  siblings: Array<[bigint]>
}

export interface ProveInputs {
  sig: Hex
  message: string
  merkleProofBytesSerialized: Uint8Array
}

export type ProveMembershipFn = (
  proveInputs: ProveInputs,
) => Promise<Uint8Array>
export type VerifyMembershipFn = (anonklubProof: Uint8Array) => Promise<boolean>

export interface ISpartanEcdsaWorker {
  prepare: () => void
  proveMembership: (proveInputs: ProveInputs) => Uint8Array
  verifyMembership: (anonklubProof: Uint8Array) => boolean
}

export interface ISpartanEcdsaWasm {
  init_panic_hook: typeof init_panic_hook
  prepare: typeof prepare
  prove_membership: typeof prove_membership
  verify_membership: typeof verify_membership
}
