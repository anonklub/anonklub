'use client'
import { PopUpButton } from '@components'

export function Balloon({
  help,
  question,
}: {
  question: string
  help?: string[]
}) {
  return (
    <div className='flex flex-row justify-between'>
      <div className='nes-balloon from-left'>
        <p className='mb-2'>{question}</p>
      </div>
      {help !== undefined && <PopUpButton content={help} />}
    </div>
  )
}
