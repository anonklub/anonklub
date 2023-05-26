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
    // TODO: remove, temporary hack to simulate proving server response
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // const { jobId } = await proofRequest.submit()
    const jobId =
      'e3d6e923cc26d886bb9f76413fa0652952f6446ab72430eab82ffe69876043d2'
    return jobId
  }, 'submit-proof-request')

  return { error, execute, isLoading, jobId }
}
