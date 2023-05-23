import { RefObject } from 'react'

export const useModal = (ref: RefObject<HTMLDialogElement>) => {
  const open = () => {
    if (ref.current?.open === false) ref.current.showModal()
  }

  const close = () => {
    if (ref.current?.open === true) ref.current?.close()
  }

  return {
    close,
    open,
    ref,
  }
}
