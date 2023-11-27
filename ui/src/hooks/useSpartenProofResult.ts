import { useAsync, useStore } from '@hooks'

export const useSpartenProofResult = () => {
  const { proofRequest } = useStore()

  const {
    data: fullProof,
    error,
    execute,
    isLoading,
  } = useAsync(async () => {
    if (proofRequest === null) return
    console.log("Before");
    const fullProof = await proofRequest.submitSpartenECDSA();
    console.log("After", fullProof.proof);
    return fullProof
  }, 'submit-proof-request')

  return { error, execute, isLoading, fullProof }
}
