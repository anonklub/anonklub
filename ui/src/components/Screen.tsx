import { ActionCreator } from 'easy-peasy'
import Link from 'next/link'
import { Balloon, JSONValue } from '@components'

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
    onClick?: ActionCreator<JSONValue | string[] | null>
  }>
}) {
  return (
    <div className='flex flex-col justify-center'>
      <Balloon question={question} help={help} />
      <div className='mt-28 flex flex-row justify-evenly'>
        {buttons.map(({ href, onClick, text }) => (
          // @ts-expect-error ???
          <Link key={href} href={href} className='nes-btn' onClick={onClick}>
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}
