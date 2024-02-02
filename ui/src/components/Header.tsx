import Image from 'next/image'
import Link from 'next/link'
import { CustomButton } from '@components'

export function Header() {
  return (
    <div className='mb-4 flex h-12 flex-row justify-between'>
      <Link href='/' legacyBehavior>
        <a href='#' className='mt=1'>
          <Image
            src='logo.svg'
            alt='logo'
            width={300}
            height={50}
            className='mt-2'
          />
        </a>
      </Link>
      <CustomButton />
    </div>
  )
}
