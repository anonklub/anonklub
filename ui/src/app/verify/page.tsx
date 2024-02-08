'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { NAVIGATION } from '#'
import { HelpModal, JsonFileInput } from '@components'
import { useStore } from '@hooks'

export default function Page() {
  const { proof, setProof } = useStore()
  const canVerify = proof !== null

  useEffect(() => {
    setProof(null)
  }, [setProof])

  return (
    <div className='flex flex-col space-y-10'>
      <div className='self-end'>
        {canVerify ? (
          <Link href='/verify/result'>
            <button className='btn btn-secondary self-center'>
              {NAVIGATION.VERIFY_PROOF}
            </button>
          </Link>
        ) : (
          <HelpModal
            content={[
              'You need to provide your proof and public signals json files.',
            ]}
          />
        )}
      </div>

      <div className='flex flex-row'>
        <JsonFileInput dataKey='proof' title='Proof' />
      </div>
    </div>
  )
}
