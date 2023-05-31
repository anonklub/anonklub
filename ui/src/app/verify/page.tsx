'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { NAVIGATION } from '#'
import { HelpModal, JsonFileInput } from '@components'
import { useStore } from '@hooks'

export default function Page() {
  const { proof, publicSignals, setProof, setPublicSignals } = useStore()
  const canVerify = proof !== null && publicSignals !== null

  useEffect(() => {
    setProof(null)
    setPublicSignals(null)
  }, [setProof, setPublicSignals])

  return (
    <div className='flex flex-col space-y-10'>
      <div className='self-end'>
        {canVerify ? (
          <Link href='/verify/result'>
            <button
              type='button'
              className={'nes-btn is-warning self-center text-lg'}
            >
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
        <JsonFileInput dataKey='publicSignals' title='Public Signals' />
      </div>
    </div>
  )
}
