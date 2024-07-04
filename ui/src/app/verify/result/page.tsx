'use client'
import { Loader } from '@components'
import { useStore, useVerifyProof } from '@hooks'
import Link from 'next/link'

export default function Page() {
  const { proof } = useStore()
  const { value: isValid } = useVerifyProof()

  if (proof === null) {
    return (
      <div>
        Missing proof `anonklub-proof.bin` file, go back to{' '}
        <Link href='/verify' className='underline'>
          /verify
        </Link>{' '}
        to upload it.
      </div>
    )
  }

  if (isValid === undefined) return <Loader />

  return (
    <div className='flex flex-col items-center justify-center space-y-5'>
      <h2 className='header'>Proof Verification Result</h2>
      <span
        className={`${isValid ? 'is-success' : 'is-error'} self-center text-lg`}
      >
        {isValid.toString().toUpperCase()}
      </span>
    </div>
  )
}
