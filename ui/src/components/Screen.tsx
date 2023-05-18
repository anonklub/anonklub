import Link from 'next/link'
import Balloon from '@components/Balloon'

export default function Screen({
  question,
  help,
  buttons,
}: {
  question: string
  help: string[]
  buttons: { href: string; text: string }[]
}) {
  return (
    <div className='flex flex-col justify-center'>
      <Balloon question={question} help={help} />
      <div className='flex flex-row justify-center space-x-2'>
        {buttons.map(({ href, text }) => (
          <Link href={href} className='nes-btn'>
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}
