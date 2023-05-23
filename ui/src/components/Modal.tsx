'use client'
import { forwardRef, ReactNode, RefObject } from 'react'
import { useModal } from '@hooks'

const Modal = forwardRef(
  (
    { children }: { children: ReactNode },
    ref: RefObject<HTMLDialogElement>,
  ) => {
    const { close } = useModal(ref)

    return (
      <section>
        <dialog className='nes-dialog' ref={ref}>
          <form method='dialog' className='space-y-5'>
            {children}
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
