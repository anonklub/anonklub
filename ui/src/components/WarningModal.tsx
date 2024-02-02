'use client'
import { useRef } from 'react'
import { modal } from '#'
import { Text } from '@components'
import { useStore } from '@hooks'

export const WarningModal = ({ content }: { content: string[] }) => {
  const ref = useRef<HTMLDialogElement>(null)
  const { close, open } = modal(ref)
  const { setWarningWasRead } = useStore()
  return (
    <div>
      <button type='button' className='nes-btn is-error' onClick={open}>
        !
      </button>
      <section>
        <dialog className='nes-dialog' ref={ref}>
          <form method='dialog' className='space-y-5'>
            <Text lines={content} />
            <menu className='dialog-menu flex flex-row justify-center'>
              <button
                className='btn btn-warning'
                onClick={() => {
                  setWarningWasRead(true)
                  close()
                }}
              >
                Cancel
              </button>
            </menu>
          </form>
        </dialog>
      </section>
    </div>
  )
}
