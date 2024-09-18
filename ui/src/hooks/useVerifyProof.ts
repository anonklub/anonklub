import { useStore } from '@/hooks/useStore'
import { useAsync } from 'react-use'
import { useHalo2EthMembershipWorker } from './useHalo2EthMembershipWorker'

export const useVerifyProof = () => {
  const { proof } = useStore()
  const { verifyMembership } = useHalo2EthMembershipWorker()

  return useAsync(async () => {
    if (proof === null) return

    return await verifyMembership(proof)
  }, [proof])
}
