'use client'
import { modal } from '#'
import { Modal } from '@/components/Modal'
import { Text } from '@/components/Text'
import { useHelp } from '@hooks'
import { useRef } from 'react'

export const HelpModal = () => {
  const ref = useRef<HTMLDialogElement>(null)
  const { helpText } = useHelp()
  const { open } = modal(ref)

  return (
    helpText !== null && (
      <div>
        <button type='button' className='btn btn-secondary' onClick={open}>
          ?
        </button>
        <Modal ref={ref}>
          <Text lines={helpText} />
        </Modal>
      </div>
    )
  )
}
