import Link from 'next/link'
import CustomButton from '@components/CustomButton'

export default function Header() {
  return (
    <div className='mb-3 flex flex-row justify-between'>
      <Link href='/'>
        <span className='nes-text is-primary text-lg'>AnonKlub</span>
      </Link>
      <CustomButton />
    </div>
  )
}
