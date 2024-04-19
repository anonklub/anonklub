'use client'
import Link from 'next/link'
import { NAVIGATION } from '#'
import { JsonFileInput } from '@components'
import { useResetAnonSet, useSetHelp, useStore } from '@hooks'

export default function Page() {
  useSetHelp([
    'Upload a json file that contains an array of ethereum addresses as hex strings that represent your anon set.',
  ])
  useResetAnonSet()
  const { anonSet } = useStore()

  return (
    <div className='center flex flex-col space-y-10'>
      <div className='flex flex-col items-end space-y-4'>
        {anonSet !== null && (
          <Link href='/prove/submit'>
            <button type='button' className='btn btn-secondary'>
              {NAVIGATION.PREPARE_PROOF_REQUEST}
            </button>
          </Link>
        )}
      </div>
      <div className='pt-20'>
        <JsonFileInput title='Anonset' />
      </div>
    </div>
  )
}
