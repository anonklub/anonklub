import { useStore } from '@/hooks'
import { useSpartanEcdsaWorker } from './useSpartanEcdsaWorker'
import { useAsync } from 'react-use'

export const useVerifyProof = () => {
  const { proof } = useStore()
  const { verifyMembership } = useSpartanEcdsaWorker()

  return useAsync(async () => {
    if (proof === null) return

    return await verifyMembership(proof)
  }, [proof])
}
