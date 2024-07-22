'use client'
import { useRef } from 'react'
import { modal } from '#'
import { Text } from '@/components/Text'
import { useStore } from '@hooks'

export const WarningModal = ({ content }: { content: string[] }) => {
  const ref = useRef<HTMLDialogElement>(null)
  const { close, open } = modal(ref)
  const { setWarningWasRead } = useStore()
  return (
    <div>
      <button type='button' className='btn btn-secondary' onClick={open}>
        !
      </button>
      <section>
        <dialog className='bg-black p-2 text-grey' ref={ref}>
          <form method='dialog' className='space-y-5'>
            <Text lines={content} />
            <menu className='dialog-menu flex flex-row justify-center'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={() => {
                  setWarningWasRead(true)
                  close()
                }}
              >
                OK
              </button>
            </menu>
          </form>
        </dialog>
      </section>
    </div>
  )
}
