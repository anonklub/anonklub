import { useAsync } from 'react-use'
import { useSpartanEcdsaWorker } from './useSpartanEcdsaWorker'
import { useStore } from './useStore'

export const useVerifyProof = () => {
  const { proof } = useStore()
  const { verifyMembership } = useSpartanEcdsaWorker()

  return useAsync(async () => {
    if (proof === null) return

    return await verifyMembership(proof)
  }, [proof])
}
