import { useEffect, useState } from 'react'
import { useStore } from '@hooks'

export const useProofResult = () => {
  const { proofRequest } = useStore()
  const [loading, setLoading] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)

  useEffect(() => {
    async function submitRequest() {
      if (proofRequest === null) return
      setLoading(true)
      // TODO: remove, temporary hack to simulate proving server response
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // const { jobId } = await proofRequest.submit()
      const jobId =
        'e3d6e923cc26d886bb9f76413fa0652952f6446ab72430eab82ffe69876043d2'
      setJobId(jobId)
      setLoading(false)
    }

    submitRequest().catch((err) => {
      console.error(err)
    })
  }, [proofRequest])

  return { jobId, loading }
}
