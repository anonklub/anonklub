'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { modal, NAVIGATION } from '#'
import {
  CheckMark,
  Modal,
  ScrollableJsonContainer,
  WarningModal,
} from '@components'
import { useProofRequest, useStore } from '@hooks'

export function SubmitProofRequest() {
  const ref = useRef<HTMLDialogElement>(null)
  const { open } = modal(ref)
  const { anonSet, setWarningWasRead, warningWasRead } = useStore()
  const { canSign, canSubmit, isSuccess, signMessage } = useProofRequest()

  useEffect(() => {
    setWarningWasRead(false)
  }, [setWarningWasRead])

  return (
    <div className='flex flex-col space-y-10'>
      <div className='flex flex-row space-x-4 self-end'>
        {canSubmit && (
          <>
            <WarningModal
              content={[
                "You are about to generate a zk proof in your browser. This is development and un audited application. Don't use the generated proof result in production or for any sensitive purposes.",
              ]}
            />
            {warningWasRead ? (
              <Link href='/prove/result'>
                <button className='btn btn-secondary'>
                  {NAVIGATION.SUBMIT_PROOF}
                </button>
              </Link>
            ) : (
              <button className='btn btn-secondary is-disabled'>
                {NAVIGATION.SUBMIT_PROOF}
              </button>
            )}
          </>
        )}
      </div>
      <div className='flex flex-row justify-evenly'>
        {anonSet !== null ? (
          <a onClick={open}>
            <CheckMark full text='Anonset' />
            <Modal ref={ref}>
              <ScrollableJsonContainer data={anonSet} />
            </Modal>
          </a>
        ) : (
          <CheckMark full={false} text='Anonset' />
        )}
        <CheckMark full={isSuccess} text='Signed' />
      </div>
      <div className='flex flex-row items-end justify-evenly'>
        <button
          className={`btn ${canSign ? 'btn-primary' : 'is-disabled'}`}
          onClick={() => signMessage()}
        >
          Sign
        </button>
      </div>
    </div>
  )
}
