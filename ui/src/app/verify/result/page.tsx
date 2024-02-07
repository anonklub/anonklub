'use client'
import Link from 'next/link'
import { Loader } from '@components'
import { useStore, useVerifyProof } from '@hooks'

export default function Page() {
  const { proof, publicSignals } = useStore()
  const { error, isError, isLoading, valid } = useVerifyProof()

  if (proof === null || publicSignals === null)
    return (
      <div>
        Missing proof and public signals JSON files, go back to{' '}
        <Link href='/verify' className='is-primary'>
          /verify
        </Link>{' '}
        to upload them.
      </div>
    )
  if (isLoading) return <Loader />
  if (isError && error !== null) return <span>{error.message}</span>
  return (
    valid !== undefined && (
      <div className='flex flex-col space-y-5'>
        <h2> Proof Verification Result</h2>
        <span className={`text-${valid ? 'blue' : 'red'} self-center text-xl`}>
          {valid.toString().toUpperCase()}
        </span>
      </div>
    )
  )
}
