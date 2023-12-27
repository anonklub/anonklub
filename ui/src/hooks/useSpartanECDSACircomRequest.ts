import { useAsync, useStore } from '@hooks'

export const useSpartanECDSACircomRequest = () => {
  const { proofRequest } = useStore()

  const {
    data: fullProof,
    error,
    execute,
    isLoading,
  } = useAsync(async () => {
    if (proofRequest === null) return
    const fullProof = await proofRequest.submitSpartanECDSA();
    return fullProof
  }, 'submit-proof-request')

  return { error, execute, isLoading, fullProof }
}
