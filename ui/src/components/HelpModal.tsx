'use client'
import { modal } from '#'
import { useHelp } from '@hooks'
import { useRef } from 'react'
import { Modal } from './Modal'
import { Text } from './Text'

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
