'use client'
import Link from 'next/link'
import { Loader } from '@components'
import { useStore, useVerifyProof } from '@hooks'

export default function Page() {
  const { proof } = useStore()
  const { isValid } = useVerifyProof()

  if (proof === null)
    return (
      <div>
        Missing proof JSON file, go back to{' '}
        <Link href='/verify' className='underline'>
          /verify
        </Link>{' '}
        to upload them.
      </div>
    )

  if (isValid === undefined) return <Loader />

  return (
    <div className='flex flex-col space-y-5'>
      <h2>Proof Verification Result</h2>
      <span
        className={`nes-text ${
          isValid ? 'is-success' : 'is-error'
        } self-center text-lg`}
      >
        {isValid.toString().toUpperCase()}
      </span>
    </div>
  )
}
