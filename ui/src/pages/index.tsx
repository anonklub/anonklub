import Link from 'next/link'

export default function App() {
  return (
    <div className='flex flex-col justify-center'>
      <div className='nes-balloon from-left w-1/2'>
        <p>What do you want to do?</p>
      </div>
      <div className='flex flex-row justify-center space-x-2'>
        <Link href='/prove' className='nes-btn'>
          Prove
        </Link>
        <Link href='/verify' className='nes-btn'>
          Verify
        </Link>
      </div>
    </div>
  )
}
