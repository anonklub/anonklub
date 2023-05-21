'use client'
import Link from 'next/link'
import { Help } from '@components'
import { AnonSetFileInput } from '@components/AnonSetFileInput'
import { useAnonSet } from '@context/anonset'

export default function Page() {
  const { anonSet } = useAnonSet()

  return (
    <div className='center flex flex-col space-y-10'>
      <div className='flex flex-col items-end space-y-4'>
        <Help
          content={[
            'Upload a json file that contains an array of ethereum addresses as hex strings that represent your anon set.',
          ]}
        />
        {anonSet.length > 0 && (
          <Link
            href={{
              pathname: '/prove/submit-request',
              query: { anonSet },
            }}
          >
            <button className='nes-btn is-success'>{'=>'} Submit Proof</button>
          </Link>
        )}
      </div>

      <AnonSetFileInput />
    </div>
  )
}
