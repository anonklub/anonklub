import { RefObject } from 'react'

export const useModal = (ref: RefObject<HTMLDialogElement>) => {
  const open = () => {
    ref.current?.showModal()
  }

  const close = () => {
    ref.current?.close()
  }

  return {
    close,
    open,
    ref,
  }
}
