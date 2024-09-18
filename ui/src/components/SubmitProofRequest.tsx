'use client'
import { modal, NAVIGATION } from '#'
import { CheckMark } from '@/components/CheckMark'
import { ErrorContainer } from '@/components/ErrorContainer'
import { Loader } from '@/components/Loader'
import { Modal } from '@/components/Modal'
import { ScrollableJsonContainer } from '@/components/ScrollableJsonContainer'
import { WarningModal } from '@/components/WarningModal'
import { useProofRequest, useResetProofRequest, useStore } from '@hooks'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export function SubmitProofRequest() {
  useResetProofRequest()
  const ref = useRef<HTMLDialogElement>(null)
  const { open } = modal(ref)
  const { anonSet, setWarningWasRead, warningWasRead } = useStore()
  const {
    canSign,
    canSubmit,
    isGeneratingMerkleProof,
    isSuccess,
    merkleProofError,
    signMessage,
  } = useProofRequest()

  useEffect(() => {
    setWarningWasRead(false)
  }, [setWarningWasRead])

  if (isGeneratingMerkleProof) return <Loader />

  if (merkleProofError !== null)
    return <ErrorContainer message={merkleProofError} />

  return (
    <div className='mt-20 flex flex-col space-y-10'>
      <div className='flex flex-row space-x-4 self-end'>
        {canSubmit && (
          <>
            <WarningModal
              content={[
                "You are about to generate a zk proof in your browser. This is development and un audited application. Don't use the generated proof result in production or for any sensitive purposes.",
              ]}
            />
            {warningWasRead
              ? (
                <Link href='/prove/result'>
                  <button type='button' className='btn btn-secondary'>
                    {NAVIGATION.SUBMIT_PROOF}
                  </button>
                </Link>
              )
              : (
                <button type='button' className='btn btn-secondary is-disabled'>
                  {NAVIGATION.SUBMIT_PROOF}
                </button>
              )}
          </>
        )}
      </div>
      <div className='flex flex-row justify-evenly'>
        {anonSet !== null
          ? (
            <>
              <button type='button' onClick={open}>
                <CheckMark full text='Anonset' />
              </button>
              <Modal ref={ref}>
                <ScrollableJsonContainer data={anonSet} />
              </Modal>
            </>
          )
          : <CheckMark full={false} text='Anonset' />}
        <CheckMark full={isSuccess} text='Signed' />
      </div>
      <div className='flex flex-row items-end justify-evenly'>
        <button
          type='button'
          className={`btn ${canSign ? 'btn-primary' : 'is-disabled'}`}
          onClick={() => signMessage()}
        >
          Sign
        </button>
      </div>
    </div>
  )
}
