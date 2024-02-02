import Image from 'next/image'

export function Star({
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
      <p>{text}</p>
    </div>
  )
}
