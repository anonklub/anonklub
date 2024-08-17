import { useAsync } from 'react-use'
import { useStore } from '@/hooks/useStore'
import { useHalo2EthMembershipWorker } from '@/hooks/useHalo2EthMembershipWorker'

export const useVerifyProof = () => {
  const { proof } = useStore()
  const { verifyMembership } = useHalo2EthMembershipWorker()

  return useAsync(async () => {
    if (proof === null) return

    return await verifyMembership({
      membershipProofSerialized: proof,
      k: 15
    })
  }, [proof])
}
