import {
  type ProveMembershipFn,
  Halo2EthMembershipWorker,
  type VerifyMembershipFn,
} from '@anonklub/halo2-eth-membership-worker'
import { useWorker } from '@/hooks/useWorker'

export const useHalo2EthMembershipWorker = () => {
  const isWorkerReady = useWorker(Halo2EthMembershipWorker)

  const proveMembership: ProveMembershipFn = async ({
    sig,
    message,
    merkleProofBytesSerialized,
  }): Promise<Uint8Array> => {
    process.env.NODE_ENV === 'development' && console.time('==> Prove')

    const proof = await Halo2EthMembershipWorker.proveMembership({
      merkleProofBytesSerialized,
      message,
      sig,
    })

    process.env.NODE_ENV === 'development' && console.timeEnd('==> Prove')

    return proof
  }

  const verifyMembership: VerifyMembershipFn = async (
    ethMembershipProof: Uint8Array,
    instances: Uint8Array,
  ): Promise<boolean> => {
    process.env.NODE_ENV === 'development' && console.time('==> Verify')

    const isVerified = await Halo2EthMembershipWorker.verifyMembership(
      ethMembershipProof,
      instances,
    )

    process.env.NODE_ENV === 'development' && console.timeEnd('==> Verify')

    return isVerified
  }

  return {
    isWorkerReady,
    proveMembership,
    verifyMembership,
  }
}
