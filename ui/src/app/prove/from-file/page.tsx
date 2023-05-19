'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { readJsonFile } from '#/read-json-file'
import { Help, ScrollableContainer } from '@components'

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [anonSet, setAnonSet] = useState<string[]>([])
  const onClick = () => {
    inputRef.current?.click()
  }
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== undefined && event.target.files !== null) {
      const parsedData = await readJsonFile(event.target.files[0])

      setAnonSet(parsedData)
    }
  }

  console.log({ anonSet })

  return (
    <div className='center flex flex-col space-y-10'>
      <div className='flex flex-col items-end space-y-4'>
        <Help
          content={[
            'Upload a json file that contains an array of ethereum addresses as hex strings that represent your anon set.',
          ]}
        />
        <Link
          href={{
            pathname: '/prove/submit-request',
            query: { anonSet },
          }}
        >
          <button className='nes-btn is-success'>{'=>'} Submit Proof</button>
        </Link>
      </div>

      {anonSet.length === 0 ? (
        <>
          <input
            type='file'
            accept='.json,application/json'
            onChange={onChange}
            className='hidden'
            ref={inputRef}
          />
          <button
            type='button'
            className='nes-btn is-warning w-1/4 self-center'
            onClick={onClick}
          >
            Upload file
          </button>
        </>
      ) : (
        <ScrollableContainer data={anonSet} />
      )}
    </div>
  )
}
