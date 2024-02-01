import Link from 'next/link'
import { CustomButton } from '@components'

export function Header() {
  return (
    <div className='mb-7 flex flex-row justify-between'>
      <Link href='/' legacyBehavior>
        <a href='#' className='nes-badge'>
          <span className='bg-blue p-2.5 text-lg text-grey'>AnonKlub</span>
        </a>
      </Link>
      <CustomButton />
    </div>
  )
}
