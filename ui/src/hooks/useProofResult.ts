import { useAsync } from 'react-use'
import type { Hex } from 'viem'
import { useSpartanEcdsaWorker } from './useSpartanEcdsaWorker'
import { useStore } from './useStore'

export const useProofResult = () => {
  const { proofRequest } = useStore()
  const { isWorkerReady, proveMembership } = useSpartanEcdsaWorker()

  return useAsync(async () => {
    if (proofRequest === null || !isWorkerReady) return

    return await proveMembership({
      merkleProofBytesSerialized: proofRequest.merkleProof,
      message: proofRequest.message,
      sig: proofRequest.rawSignature as Hex,
    })
  }, [isWorkerReady, proofRequest])
}
