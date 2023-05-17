import Link from 'next/link'

export default function FromFileOrFromOnChain() {
  return (
    <div className='flex flex-col justify-center'>
      <div className='nes-balloon from-left w-4/5'>
        <p>What type of anon set do you want to prove?</p>
      </div>
      <div className='flex flex-row justify-center space-x-2'>
        <Link href='prove/from-file/cryptopunk' className='nes-btn'>
          Cryptopunk
        </Link>
        <Link href='/prove/from-file/ens' className='nes-btn'>
          ENS
        </Link>
      </div>
    </div>
  )
}
