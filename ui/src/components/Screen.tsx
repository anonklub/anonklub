import Link from 'next/link'
import { QuestionBox } from '@components'

export function Screen({
  buttons,
  help,
  question,
}: {
  question: string
  help: string[]
  buttons: Array<{
    href: string
    text: string
  }>
}) {
  return (
    <div className='flex flex-col justify-center'>
      <QuestionBox question={question} help={help} />
      <div className='mt-28 flex flex-row justify-evenly'>
        {buttons.map(({ href, text }) => (
          <Link key={href} href={href} className='btn btn-primary'>
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}
