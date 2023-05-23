'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { ScrollableJsonContainer } from '@components'
import { useAnonSet } from '@context/anonset'

export function AnonSetResults({
  anonSet,
  title,
}: {
  anonSet: string[]
  title: string
}) {
  const { setAnonSet } = useAnonSet()
  useEffect(() => {
    setAnonSet(anonSet)
  }, [setAnonSet, anonSet])

  return (
    <>
      <div className='mb-5 flex flex-row justify-between'>
        <div>
          <h2>{title} Anonset</h2>
          <h3 className='nes-text is-success'>Results</h3>
        </div>
        <Link href='/prove/submit-request'>
          <button className='nes-btn is-success'>{'=>'} Submit Proof</button>
        </Link>
      </div>
      <ScrollableJsonContainer data={anonSet} />
    </>
  )
}
