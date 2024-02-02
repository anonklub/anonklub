'use client'
import { useRef } from 'react'
import { modal } from '#'
import { Modal, Text } from '@components'

export const HelpModal = ({ content }: { content: string[] }) => {
  const ref = useRef<HTMLDialogElement>(null)
  const { open } = modal(ref)

  return (
    <div>
      <button className='btn btn-warning' onClick={open}>
        ?
      </button>
      <Modal ref={ref}>
        <Text lines={content} />
      </Modal>
    </div>
  )
}
