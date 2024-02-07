import { Hex } from 'viem'
import { useAsync, useStore } from '@hooks'
import { useSpartanEcdsaWorker } from './useSpartanEcdsaWorker'

export const useProofResult = () => {
  const { proofRequest } = useStore()
  const { proveMembership } = useSpartanEcdsaWorker()

  const { data: fullProof, error } = useAsync(async () => {
    if (proofRequest === null) return

    return await proveMembership({
      merkleProofBytesSerialized: proofRequest.merkleProof,
      message: proofRequest.message,
      sig: proofRequest.rawSignature as Hex,
    })
  })

  return { error, fullProof }
}
