import Link from 'next/link'
import Balloon from '@components/Balloon'

export default function FromFileOrFromOnChain() {
  return (
    <div className='flex flex-col justify-center'>
      <Balloon
        question='Where does your anon set (list of addresses) lives?'
        help={[
          "On chain: we'll fetch the list of addresses for you from the blockchain (using providers such as GoogleBig Query, Dune Analytics or The Graph depending on the anon set type).",
          "Locally: you'll need to upload a json file containing a list of addresses.",
        ]}
      />
      <div className='flex flex-row justify-center space-x-2'>
        <Link href='/prove/on-chain' className='nes-btn'>
          On chain
        </Link>
        <Link href='/prove/file' className='nes-btn'>
          Locally (file)
        </Link>
      </div>
    </div>
  )
}
