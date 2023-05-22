'use client'
import { useRef } from 'react'
import { Text } from '@components'

export function PopUpButton({
  className = 'nes-btn is-warning',
  content,
}: {
  className?: string
  content: string[]
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const onClick = () => {
    dialogRef.current?.showModal()
  }

  return (
    <section>
      <button type='button' className={className} onClick={onClick}>
        ?
      </button>
      <dialog className='nes-dialog' id='dialog' ref={dialogRef}>
        <form method='dialog'>
          <Text lines={content} />
          <menu className='dialog-menu flex flex-row justify-center'>
            <button className='nes-btn'>Cancel</button>
          </menu>
        </form>
      </dialog>
    </section>
  )
}
