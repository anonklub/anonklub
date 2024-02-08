import { useAsync, useStore } from '@/hooks'
import { useSpartanEcdsaWorker } from './useSpartanEcdsaWorker'

export const useVerifyProof = () => {
  const { proof } = useStore()
  const { verifyMembership } = useSpartanEcdsaWorker()

  const { data: isValid, error } = useAsync(async () => {
    if (proof === null) return

    return await verifyMembership(proof)
  })

  return {
    error,
    isValid,
  }
}
