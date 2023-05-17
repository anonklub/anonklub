import Link from 'next/link'
import CustomButton from '@components/CustomButton'

export default function Header() {
  return (
    <div className='flex flex-row justify-between'>
      <Link href='/'>
        <span className='nes-text is-primary'>AnonKlub</span>
      </Link>
      <CustomButton />
    </div>
  )
}
