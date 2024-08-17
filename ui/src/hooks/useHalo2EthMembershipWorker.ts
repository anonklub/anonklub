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
    k
  }): Promise<Uint8Array> => {
    process.env.NODE_ENV === 'development' && console.time('==> Prove')

    const proof = await Halo2EthMembershipWorker.proveMembership({
      merkleProofBytesSerialized,
      message,
      sig,
      k
    })

    process.env.NODE_ENV === 'development' && console.timeEnd('==> Prove')

    return proof
  }

  const verifyMembership: VerifyMembershipFn = async ({
    membershipProofSerialized,
    k
  }): Promise<boolean> => {
    process.env.NODE_ENV === 'development' && console.time('==> Verify')

    const isVerified = await Halo2EthMembershipWorker.verifyMembership({
      membershipProofSerialized,
      k
    })

    console.log("isVerified", isVerified)

    process.env.NODE_ENV === 'development' && console.timeEnd('==> Verify')

    return isVerified
  }

  return {
    isWorkerReady,
    proveMembership,
    verifyMembership,
  }
}
