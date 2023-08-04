import { useAsync, useStore } from '@hooks'

export const useProofResult = () => {
  const { proofRequest } = useStore()

  const {
    data: jobId,
    error,
    execute,
    isLoading,
  } = useAsync(async () => {
    if (proofRequest === null) return
    const { jobId } = await proofRequest.submit()
    return jobId
  }, 'submit-proof-request')

  return { error, execute, isLoading, jobId }
}
