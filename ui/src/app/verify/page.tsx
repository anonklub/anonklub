'use client'
import { HelpModal, JsonFileInput } from '@components'
import { useStore } from '@hooks'

export default function Page() {
  const { proof, publicSignals } = useStore()
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
        <JsonFileInput dataKey='proof' title='Proof' />
        <JsonFileInput dataKey='publicSignals' title='Public Signals' />
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
