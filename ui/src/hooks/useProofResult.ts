import { useAsync } from 'react-use'
import type { Hex } from 'viem'
import { useSpartanEcdsaWorker } from '@/hooks/useSpartanEcdsaWorker'
import { useHalo2EthMembershipWorker } from '@/hooks/useHalo2EthMembershipWorker'
import { useStore } from '@/hooks/useStore'

export const useProofResult = () => {
  const { proofRequest } = useStore()
  const { isWorkerReady, proveMembership } = useHalo2EthMembershipWorker()

  return useAsync(async () => {
    if (proofRequest === null || !isWorkerReady) return

    return await proveMembership({
      merkleProofBytesSerialized: proofRequest.merkleProof,
      message: proofRequest.message,
      sig: proofRequest.rawSignature as Hex,
      k: 15
    })
  }, [isWorkerReady, proofRequest])
}
