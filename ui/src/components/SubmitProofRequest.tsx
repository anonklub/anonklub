'use client'
import { useEffect, useState } from 'react'
import { Help, Star } from '@components'

export function SubmitProofRequest({ anonSet }) {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [signedMessage, setSignedMessage] = useState('')

  useEffect(() => {
    if (message === '') {
      setProgress(0)
    }

    if (message !== '') {
      setProgress(1)
    }

    if (signedMessage !== '') {
      setProgress(2)
    }
  }, [message, signedMessage])

  return (
    <div className='flex flex-col space-y-4'>
      <div className='self-end'>
        <Help
          content={[
            'You need to choose a message and sign it with the address you want to prove is part on the anonset. This signature and the anonset are required to build your zk proof.',
          ]}
        />
      </div>
      <progress
        className='nes-progress is-primary'
        value={progress}
        max='2'
      ></progress>
      <div className='flex flex-row justify-evenly'>
        <Star full={anonSet.length > 0} text='Anonset' />
        <Star full={message !== ''} text='Message' />
        <Star full={signedMessage !== ''} text='Signed' />
      </div>
      <div className='flex flex-row items-end justify-between'>
        <div className='nes-field'>
          <label htmlFor='name_field'>Message</label>
          <input
            type='text'
            id='name_field'
            className='nes-input'
            value={message}
            onChange={() => {
              setSignedMessage('')
              // @ts-expect-error
              setMessage(event.target.value)
            }}
          />
        </div>
        {message !== '' && signedMessage === '' && (
          <button
            type='button'
            className='nes-btn is-warning'
            onClick={() => {
              setSignedMessage('0x1234')
            }}
          >
            Sign
          </button>
        )}
      </div>

      {progress === 2 && (
        <button type='button' className='nes-btn is-warning'>
          Submit Proof Request
        </button>
      )}
    </div>
  )
}
