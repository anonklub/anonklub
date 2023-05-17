import { useRouter } from 'next/router'

export default function AnonSetType() {
  const router = useRouter()
  console.log(router.query)
  const { slug } = router.query
  return <span className='nes-text is-primary'>{slug}</span>
}
