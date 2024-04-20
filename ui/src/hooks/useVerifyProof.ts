import { useAsync } from 'react-use'
import { useStore, useSpartanEcdsaWorker } from '@hooks'

export const useVerifyProof = () => {
  const { proof } = useStore()
  const { verifyMembership } = useSpartanEcdsaWorker()

  return useAsync(async () => {
    if (proof === null) return

    return await verifyMembership(proof)
  }, [proof])
}
