import { useAsync, useStore } from '@hooks'

export const useSpartanProofResult = () => {
  const { proofRequest } = useStore()

  const {
    data: fullProof,
    error,
    execute,
    isLoading,
  } = useAsync(async () => {
    if (proofRequest === null) return
    console.log("Before");
    const fullProof = await proofRequest.submitSpartanECDSA();
    console.log("After", fullProof.proof);
    return fullProof
  }, 'submit-proof-request')

  return { error, execute, isLoading, fullProof }
}
