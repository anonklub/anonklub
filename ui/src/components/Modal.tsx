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
          <form method='dialog'>
            {children}
            <menu className='dialog-menu flex flex-row justify-center'>
              <button className='nes-btn mt-4' onClick={close}>
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
