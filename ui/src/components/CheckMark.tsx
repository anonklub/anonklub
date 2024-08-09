import Image from 'next/legacy/image'

export function CheckMark({
  full = false,
  text,
}: {
  full?: boolean
  text?: string
}) {
  return (
    <div className='flex flex-row space-x-2'>
      <Image
        alt='check mark'
        className={`${full ? 'check-done' : 'check-todo'}`}
        src='/check.svg'
        height={20}
        width={20}
      />{' '}
      {text === 'Anonset' && full === true
        ? <p className='hover:underline hover:cursor-pointer'>{text}</p>
        : <p className='hover:cursor-default'>{text}</p>}
    </div>
  )
}
