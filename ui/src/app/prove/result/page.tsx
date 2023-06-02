'use client'
import Link from 'next/link'
import { config } from '#'
import { Loader } from '@components'
import { useProofResult } from '@hooks'

export default function Page() {
  const { isLoading, jobId } = useProofResult()
  return isLoading && jobId !== null ? (
    <Loader />
  ) : (
    <div className='justify center flex flex-col space-y-10'>
      <h2 className='self-start'>Proof Results</h2>
      {jobId !== null && typeof jobId === 'string' && (
        <>
          <span>
            Proof Generation Job <strong>{jobId}</strong> added to queue. It
            might take 5- 10 min to complete.
          </span>
          <span>
            Check your results later at
            <div className='nes-text is-success flex flex-col'>
              <Link href={`${config.urls.proveApi}/proofs/${jobId}/input.json`}>
                /proofs/{jobId}/input.json
              </Link>
              <Link href={`${config.urls.proveApi}/proofs/${jobId}/proof.json`}>
                /proofs/{jobId}/proof.json
              </Link>
              <Link
                href={`${config.urls.proveApi}/proofs/${jobId}/public.json`}
              >
                /proofs/{jobId}/public.json
              </Link>
              <Link
                href={`${config.urls.proveApi}/proofs/${jobId}/witness.wtns`}
              >
                /proofs/{jobId}/witness.wtns
              </Link>
            </div>
          </span>
        </>
      )}
    </div>
  )
}
