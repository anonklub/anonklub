import { RefObject } from 'react'

export const modal = (ref: RefObject<HTMLDialogElement>) => {
  const open = () => {
    if (ref.current?.open === false) {
      ref.current.showModal()
      // Attach the event listener to handle outside clicks
      ref.current.addEventListener('click', handleOutsideClick)
    }
  }

  const close = () => {
    if (ref.current?.open === true) {
      ref.current?.close()
      // Remove the event listener when the modal is closed
      ref.current.removeEventListener('click', handleOutsideClick)
    }
  }

  const handleOutsideClick = (event: MouseEvent) => {
    // Close the modal if the click is on the dialog element itself
    if (event.target === ref.current) close()
  }

  return {
    close,
    open,
    ref,
  }
}
