'use client'
import { useRef } from 'react'
import { Modal } from '@components'
import { useModal } from '@hooks'

export const HelpModal = ({
  className = 'nes-btn is-warning',
  content,
}: {
  className?: string
  content: string[]
}) => {
  const ref = useRef<HTMLDialogElement>(null)
  const { open } = useModal(ref)

  return (
    <div>
      <button type='button' className={className} onClick={open}>
        ?
      </button>
      <Modal content={content} ref={ref} />
    </div>
  )
}
