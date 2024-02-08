import Link from 'next/link'
import { HelpModal } from '@components'

export function Screen({
  buttons,
  help,
  question,
}: {
  question: string
  help?: string[]
  buttons: Array<{
    href: string
    text: string
  }>
}) {
  return (
    <div className='flex flex-col items-center justify-center'>
      {help !== undefined && <HelpModal content={help} />}
      <h2 className='header'>{question}</h2>
      <div className='buttons-row'>
        {buttons.map(({ href, text }) => (
          <Link key={href} href={href} className='btn btn-primary'>
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}
