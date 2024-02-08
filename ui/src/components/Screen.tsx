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
    <div className='flex flex-col justify-center'>
      {help !== undefined && <HelpModal content={help} />}
      <h2 className='question-header'>{question}</h2>
      <div className='mt-10 flex flex-row justify-center space-x-20'>
        {buttons.map(({ href, text }) => (
          <Link key={href} href={href} className='btn btn-primary'>
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}
