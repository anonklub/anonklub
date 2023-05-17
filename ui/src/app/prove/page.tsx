import Link from 'next/link'

export default function FromFileOrFromOnChain() {
  return (
    <div className='flex flex-col justify-center'>
      <div className='nes-balloon from-left w-4/5'>
        <p>Where does your anon set (list of addresses) lives?</p>
      </div>
      <div className='flex flex-row justify-center space-x-2'>
        <Link href='/prove/on-chain' className='nes-btn'>
          On chain
        </Link>
        <Link href='/prove/file' className='nes-btn'>
          Locally (file)
        </Link>
      </div>
    </div>
  )
}
