'use client'
import { forwardRef, ReactNode, RefObject } from 'react'
import { modal } from '#'

const Modal = forwardRef(
  (
    { children }: { children: ReactNode },
    ref: RefObject<HTMLDialogElement>,
  ) => {
    const { close } = modal(ref)

    return (
      <section>
        <dialog className='bg-grey p-2' ref={ref}>
          <form method='dialog' className='space-y-5'>
            {children}
            <menu className='dialog-menu flex flex-row justify-center'>
              <button className='btn btn-cancel' onClick={close}>
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
