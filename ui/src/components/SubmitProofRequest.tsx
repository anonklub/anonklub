'use client'
import { useRef } from 'react'
import { useProofRequest } from '@/hooks/useProofRequest'
import { HelpModal, Modal, ScrollableJsonContainer, Star } from '@components'
import { useAnonSet } from '@context/anonset'
import { useModal } from '@hooks'

export function SubmitProofRequest() {
  const ref = useRef<HTMLDialogElement>(null)
  const { open } = useModal(ref)
  const { anonSet } = useAnonSet()
  const {
    canSign,
    canSubmit,
    message,
    proofRequest,
    rawSignature,
    setMessage,
    setRawSignature,
  } = useProofRequest()

  return (
    <div className='flex flex-col space-y-10'>
      <div className='self-end'>
        <HelpModal
          content={[
            'You need to choose a message and sign it with the address you want to prove is part on the anonset. This signature and the anonset are required to build your zk proof.',
          ]}
        />
      </div>
      <div className='flex flex-row justify-evenly'>
        {anonSet?.length > 0 ? (
          <a onClick={open}>
            <Star full={anonSet?.length > 0} text='Anonset' />
            <Modal ref={ref}>
              <ScrollableJsonContainer data={anonSet} />
            </Modal>
          </a>
        ) : (
          <Star full={false} text='Anonset' />
        )}
        <Star full={message !== ''} text='Message' />
        <Star full={rawSignature !== ''} text='Signed' />
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
              setRawSignature('')
              setMessage(target.value)
            }}
          />
        </div>

        <button
          type='button'
          className={`nes-btn ${canSign ? 'is-warning' : 'is-disabled'}`}
          onClick={() => {
            setRawSignature('0x1234')
          }}
        >
          Sign
        </button>
      </div>

      <button
        type='button'
        className={`nes-btn self-center text-lg ${
          canSubmit ? 'is-warning' : 'is-disabled'
        }`}
        onClick={() => {
          console.log({ proofRequest })
        }}
      >
        Submit Proof Request
      </button>
    </div>
  )
}
