'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { modal } from '#'
import { HelpModal, Modal, ScrollableJsonContainer, Star } from '@components'
import { useProofRequest, useStore } from '@hooks'

export function SubmitProofRequest() {
  const ref = useRef<HTMLDialogElement>(null)
  const { open } = modal(ref)
  const { anonSet } = useStore()
  const {
    canSign,
    canSubmit,
    isSuccess,
    message,
    proofRequest,
    setMessage,
    signMessage,
  } = useProofRequest()

  return (
    <div className='flex flex-col space-y-10'>
      <div className='self-end'>
        {canSubmit ? (
          <Link href='/prove/submit-request'>
            <button
              className='nes-btn is-success'
              onClick={() => {
                console.log('proofRequest', proofRequest)
              }}
            >
              {'=>'} Submit Proof Request
            </button>
          </Link>
        ) : (
          <HelpModal
            content={[
              'You need to choose a message and sign it with the address you want to prove is part on the anonset. This signature and the anonset are required to build your zk proof.',
            ]}
          />
        )}
      </div>
      <div className='flex flex-row justify-evenly'>
        {anonSet !== null ? (
          <a onClick={open}>
            <Star full text='Anonset' />
            <Modal ref={ref}>
              <ScrollableJsonContainer data={anonSet} />
            </Modal>
          </a>
        ) : (
          <Star full={false} text='Anonset' />
        )}
        <Star full={message !== ''} text='Message' />
        <Star full={isSuccess} text='Signed' />
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
              setMessage(target.value)
            }}
          />
        </div>

        <button
          type='button'
          className={`nes-btn ${canSign ? 'is-warning' : 'is-disabled'}`}
          onClick={() => signMessage()}
        >
          Sign
        </button>
      </div>
    </div>
  )
}
