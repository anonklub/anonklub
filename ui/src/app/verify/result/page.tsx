'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import verificationKey from '$/verification_key.json'
import { Loader } from '@components'
import { useAsync, useStore } from '@hooks'

const { groth16 } = require('snarkjs')

export default function Page() {
  const { proof, publicSignals } = useStore()
  const {
    data: valid,
    error,
    execute,
    isLoading,
  } = useAsync<boolean>(
    () => groth16.verify(verificationKey, publicSignals, proof),
    'zkp-verification-result',
  )

  useEffect(() => {
    execute()
  }, [execute])

  if (proof === null || publicSignals === null)
    return (
      <div>
        Missing proof and public signals JSON files, go back to{' '}
        <Link href='/verify' className='nes-text is-primary'>
          /verify
        </Link>{' '}
        to upload them.
      </div>
    )
  if (isLoading) return <Loader />
  if (error !== undefined && error instanceof Error)
    return <span>{error.message}</span>
  return (
    valid !== undefined && (
      <div className='flex flex-col space-y-5'>
        <h2>Proof Verification Result</h2>
        <span
          className={`nes-text ${
            valid ? 'is-success' : 'is-error'
          } self-center text-lg`}
        >
          {valid.toString().toUpperCase()}
        </span>
      </div>
    )
  )
}
