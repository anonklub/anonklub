import Link from 'next/link'
import { Balloon } from '@components'

export function Screen({
  buttons,
  help,
  question,
}: {
  question: string
  help: string[]
  buttons: Array<{ href: string; text: string; onClick?: () => void }>
}) {
  return (
    <div className='flex flex-col justify-center'>
      <Balloon question={question} help={help} />
      <div className='mt-28 flex flex-row justify-evenly'>
        {buttons.map(({ href, onClick, text }) => (
          <Link key={href} href={href} className='nes-btn' onClick={onClick}>
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}
