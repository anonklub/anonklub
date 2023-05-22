'use client'
import { useState } from 'react'
import { HelpModal, JsonFileInput, JSONValue } from '@components'

export default function Page() {
  const [proof, setProof] = useState<JSONValue | null>(null)
  const [publicSignals, setPublicSignals] = useState<JSONValue | null>(null)
  const canVerify = proof !== null && publicSignals !== null

  return (
    <div className='flex flex-col space-y-10'>
      <div className='self-end'>
        <HelpModal
          content={[
            'You need to provide your proof and public signals json files.',
          ]}
        />
      </div>

      <div className='flex flex-row'>
        <JsonFileInput setData={setProof} title='Proof' />
        <JsonFileInput setData={setPublicSignals} title='Public Signals' />
      </div>

      <button
        type='button'
        className={`nes-btn self-center text-lg ${
          canVerify ? 'is-warning' : 'is-disabled'
        }`}
        onClick={() => {
          console.log('verify proof')
        }}
      >
        Verify Proof
      </button>
    </div>
  )
}
