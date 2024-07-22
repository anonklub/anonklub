'use client'
import Image from 'next/image'
import Link from 'next/link'
import { HelpModal } from '@/components/HelpModal'
import { ConnectButton } from '@/components/ConnectButton'

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
      <div className='flex items-center justify-end space-x-4'>
        <ConnectButton />
        <HelpModal />
      </div>
    </div>
  )
}
