'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { modal, NAVIGATION } from '#'
import {
  HelpModal,
  Modal,
  ScrollableJsonContainer,
  Star,
  WarningModal,
} from '@components'
import { useProofRequest, useStore } from '@hooks'

export function SubmitProofRequest() {
  const ref = useRef<HTMLDialogElement>(null)
  const { open } = modal(ref)
  const { anonSet, setWarningWasRead, warningWasRead } = useStore()
  const { canSign, canSubmit, isSuccess, message, setMessage, signMessage } =
    useProofRequest()

  useEffect(() => {
    setWarningWasRead(false)
  }, [setWarningWasRead])

  return (
    <div className='flex flex-col space-y-10'>
      <div className='flex flex-row space-x-4 self-end'>
        {canSubmit ? (
          <>
            <WarningModal
              content={[
                "You are about to submit your proof request to our server. This server is meant to be used for demonstration and development purposes. We haven't run a trusted setup ceremony. This is both a privacy and security issue. Don't use the generated proof results in production or for any sensitive purposes.",
              ]}
            />
            {warningWasRead ? (
              <Link href='/prove/result'>
                <button className='nes-btn is-success'>
                  {NAVIGATION.SUBMIT_PROOF}
                </button>
              </Link>
            ) : (
              <button className='nes-btn is-disabled'>
                {NAVIGATION.SUBMIT_PROOF}
              </button>
            )}
          </>
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
