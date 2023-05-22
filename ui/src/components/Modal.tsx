'use client'
import { forwardRef, RefObject } from 'react'
import { Text } from '@components'
import { useModal } from '@hooks'

const Modal = forwardRef(
  ({ content }: { content: string[] }, ref: RefObject<HTMLDialogElement>) => {
    const { close } = useModal(ref)

    return (
      <section>
        <dialog className='nes-dialog' ref={ref}>
          <form method='dialog'>
            <Text lines={content} />
            <menu className='dialog-menu flex flex-row justify-center'>
              <button className='nes-btn' onClick={close}>
                Cancel
              </button>
            </menu>
          </form>
        </dialog>
      </section>
    )
  },
)

Modal.displayName = 'Modal'

export { Modal }
