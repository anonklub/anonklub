import type { initPanicHook, initThreadPool, prove_membership, verify_membership } from '@anonklub/halo2-eth-membership'
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

export interface IHalo2EthMembershipaWorker {
  prepare: (num_threads: number) => void
  proveMembership: (proveInputs: ProveInputs) => Uint8Array
  verifyMembership: (
    ethMembershipProof: Uint8Array,
    instances: Uint8Array,
  ) => boolean
}

export interface IHalo2EthMembershipWasm {
  initPanicHook: typeof initPanicHook
  initThreadPool: typeof initThreadPool
  prove_membership: typeof prove_membership
  verify_membership: typeof verify_membership
}
