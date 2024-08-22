import { useSpartanEcdsaWorker } from '@/hooks/useSpartanEcdsaWorker'
import { useStore } from '@/hooks/useStore'
import { useAsync } from 'react-use'

export const useVerifyProof = () => {
  const { proof } = useStore()
  const { verifyMembership } = useSpartanEcdsaWorker()

  return useAsync(async () => {
    if (proof === null) return

    return await verifyMembership(proof)
  }, [proof])
}
