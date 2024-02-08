import Image from 'next/image'
import Link from 'next/link'
import { ConnectButton } from '@components'

export function Header() {
  return (
    <div className='my-6 flex h-12 flex-row items-center justify-between'>
      <Link href='/' legacyBehavior>
        <div className='relative h-[60px] max-h-[60px] w-1/2 max-w-[400px]'>
          <a href='#' className='mt=1'>
            <Image
              src='/logo.svg'
              priority={true}
              alt='logo'
              layout='fill'
              objectFit='contain'
            />
          </a>
        </div>
      </Link>
      <ConnectButton />
    </div>
  )
}
