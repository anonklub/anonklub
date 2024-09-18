'use client'
import { ConnectButton } from '@/components/ConnectButton'
import { HelpModal } from '@/components/HelpModal'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <div className='my-6 flex h-12 flex-row items-center justify-between'>
      <Link className='relative h-[60px] max-h-[60px] w-1/2 max-w-[400px]' href='/'>
        <Image
          src='/logo.svg'
          alt='logo'
          layout='fill'
        />
      </Link>
      <div className='flex items-center justify-end space-x-4'>
        <ConnectButton />
        <HelpModal />
      </div>
    </div>
  )
}
