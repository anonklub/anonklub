import { useAsync } from 'react-use'
import { useStore } from '@/hooks/useStore'
import { useSpartanEcdsaWorker } from '@/hooks/useSpartanEcdsaWorker'

export const useVerifyProof = () => {
  const { proof } = useStore()
  const { verifyMembership } = useSpartanEcdsaWorker()

  return useAsync(async () => {
    if (proof === null) return

    return await verifyMembership(proof)
  }, [proof])
}
