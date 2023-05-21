'use client'
import { useRef, useState } from 'react'
import { Help, ScrollableContainer, Star } from '@components'
import { useAnonSet } from '@context/anonset'

export function SubmitProofRequest() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { anonSet } = useAnonSet()
  const [message, setMessage] = useState('')
  const [signedMessage, setSignedMessage] = useState('')
  const canSign = message !== '' && signedMessage === ''
  const canSubmit = signedMessage !== '' && anonSet?.length > 0

  return (
    <div className='flex flex-col space-y-10'>
      <div className='self-end'>
        <Help
          content={[
            'You need to choose a message and sign it with the address you want to prove is part on the anonset. This signature and the anonset are required to build your zk proof.',
          ]}
        />
      </div>
      <div className='flex flex-row justify-evenly'>
        {anonSet?.length > 0 ? (
          <a
            onClick={() => {
              dialogRef.current?.showModal()
            }}
          >
            <Star full={anonSet?.length > 0} text='Anonset' />
            <dialog className='nes-dialog' id='anonset' ref={dialogRef}>
              <form method='dialog'>
                <ScrollableContainer data={anonSet} />
                <menu className='dialog-menu flex flex-row justify-center'>
                  <button
                    className='nes-btn mt-4'
                    onClick={() => {
                      // @ts-expect-error anonset el exists
                      document.getElementById('anonset').close()
                    }}
                  >
                    Cancel
                  </button>
                </menu>
              </form>
            </dialog>
          </a>
        ) : (
          <Star full={false} text='Anonset' />
        )}
        <Star full={message !== ''} text='Message' />
        <Star full={signedMessage !== ''} text='Signed' />
      </div>
      <div className='flex flex-row items-end justify-evenly'>
        <div className='nes-field'>
          <label htmlFor='name_field'>Message</label>
          <input
            type='text'
            id='name_field'
            className='nes-input'
            value={message}
            onChange={({ target }) => {
              setSignedMessage('')
              setMessage(target.value)
            }}
          />
        </div>

        <button
          type='button'
          className={`nes-btn ${canSign ? 'is-warning' : 'is-disabled'}`}
          onClick={() => {
            setSignedMessage('0x1234')
          }}
        >
          Sign
        </button>
      </div>

      <button
        type='button'
        className={`nes-btn w-1/2 self-center ${
          canSubmit ? 'is-warning' : 'is-disabled'
        }`}
      >
        Submit Proof Request
      </button>
    </div>
  )
}
