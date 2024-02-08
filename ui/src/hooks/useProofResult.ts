import { useAsync } from 'react-use'
import { Hex } from 'viem'
import { useStore } from '@hooks'
import { useSpartanEcdsaWorker } from './useSpartanEcdsaWorker'

export const useProofResult = () => {
  const { proofRequest } = useStore()
  const { proveMembership } = useSpartanEcdsaWorker()

  return useAsync(async () => {
    if (proofRequest === null) return

    return await proveMembership({
      merkleProofBytesSerialized: proofRequest.merkleProof,
      message: proofRequest.message,
      sig: proofRequest.rawSignature as Hex,
    })
  }, [proofRequest])
}
