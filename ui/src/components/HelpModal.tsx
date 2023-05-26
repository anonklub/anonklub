'use client'
import { useRef } from 'react'
import { modal } from '#'
import { Modal, Text } from '@components'

export const HelpModal = ({
  className = 'nes-btn is-warning',
  content,
}: {
  className?: string
  content: string[]
}) => {
  const ref = useRef<HTMLDialogElement>(null)
  const { open } = modal(ref)

  return (
    <div>
      <button type='button' className={className} onClick={open}>
        ?
      </button>
      <Modal ref={ref}>
        <Text lines={content} />
      </Modal>
    </div>
  )
}
