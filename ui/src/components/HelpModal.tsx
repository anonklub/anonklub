'use client'
import { useRef } from 'react'
import { modal } from '#'
import { useHelp } from '@/hooks'
import { Modal, Text } from '@components'

export const HelpModal = () => {
	const ref = useRef<HTMLDialogElement>(null)
	const { helpText } = useHelp()
	const { open } = modal(ref)

	return (
		helpText !== null && (
			<div>
				<button className='btn btn-secondary' onClick={open}>
					?
				</button>
				<Modal ref={ref}>
					<Text lines={helpText} />
				</Modal>
			</div>
		)
	)
}
