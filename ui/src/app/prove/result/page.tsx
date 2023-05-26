'use client'
import { useProofRequest } from '@hooks'
import { useEffect, useState } from 'react'
import { JobResponse } from '@anonset/membership/src/ProofRequest/interface'

export default function Page() {
  const { proofRequest } = useProofRequest()
  const [jobResponse, setJobResponse] = useState<JobResponse | null>(null)

  useEffect(() => {
    async function submitRequest() {
      if (proofRequest === null) return
      const jobResponse = await proofRequest.submit()
      setJobResponse(jobResponse)
    }

    submitRequest().catch((err) => {
      console.error(err)
    })
  }, [proofRequest])

  return (
    <div className='justify center flex flex-col space-y-10'>
      <h2 className='self-start'>Proof Results</h2>
      {jobResponse !== null && (
        <>
          <span>jobId: {jobResponse.jobId}</span>
          <span>message: {jobResponse.message}</span>
        </>
      )}
    </div>
  )
}
