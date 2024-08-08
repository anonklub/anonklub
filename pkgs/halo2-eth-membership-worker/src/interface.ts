import type {
  initSync,
  initThreadPool,
  initPanicHook,
  prove_membership,
  verify_membership,
} from '@anonklub/halo2-eth-membership'
import init from "@anonklub/halo2-eth-membership";
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
export type VerifyMembershipFn = (
  ethMembershipProof: Uint8Array,
  instances: Uint8Array,
) => Promise<boolean>

export interface IHalo2EthMembershipaWorker {
  prepare: () => void
  proveMembership: (proveInputs: ProveInputs) => Uint8Array
  verifyMembership: (
    ethMembershipProof: Uint8Array,
    instances: Uint8Array,
  ) => boolean
}

export interface IHalo2EthMembershipWasm {
  init: typeof init
  initSync: typeof initSync
  initPanicHook: typeof initPanicHook
  initThreadPool: typeof initThreadPool
  prove_membership: typeof prove_membership
  verify_membership: typeof verify_membership
}
