import { useHalo2EthMembershipWorker } from '@/hooks/useHalo2EthMembershipWorker'
import { useSpartanEcdsaWorker } from '@/hooks/useSpartanEcdsaWorker'
import { useStore } from '@/hooks/useStore'
import { useAsync } from 'react-use'
import type { Hex } from 'viem'

export const useProofResult = () => {
  const { proofRequest } = useStore()
  const { isWorkerReady, proveMembership } = useHalo2EthMembershipWorker()

  return useAsync(async () => {
    if (proofRequest === null || !isWorkerReady) return

    return await proveMembership({
      merkleProofBytesSerialized: proofRequest.merkleProof,
      message: proofRequest.message,
      sig: proofRequest.rawSignature as Hex,
    })
  }, [isWorkerReady, proofRequest])
}
