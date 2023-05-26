'use client'
import { Loader } from '@components'
import { useProofResult } from '@hooks'
import Link from 'next/link'

export default function Page() {
  const { jobId, loading } = useProofResult()
  return (loading as boolean) && jobId !== null ? (
    <Loader />
  ) : (
    <div className='justify center flex flex-col space-y-10'>
      <h2 className='self-start'>Proof Results</h2>
      {jobId !== null && (
        <>
          <span>
            Proof Generation Job <strong>{jobId}</strong> added to queue. It
            might take 5- 10 min to complete.
          </span>
          <span>
            Check your results later at
            <div className='nes-text is-success flex flex-col'>
              <Link href={`/proofs/${jobId as string}/input.json`}>
                /proofs/{jobId}/input.json
              </Link>
              <Link href={`/proofs/${jobId as string}/proof.json`}>
                /proofs/{jobId}/proof.json
              </Link>
              <Link href={`/proofs/${jobId as string}/public.json`}>
                /proofs/{jobId}/public.json
              </Link>
              <Link href={`/proofs/${jobId as string}/witness.wtns`}>
                /proofs/{jobId}/witness.wtns
              </Link>
            </div>
          </span>
        </>
      )}
    </div>
  )
}
