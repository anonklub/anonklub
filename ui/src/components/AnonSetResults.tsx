'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { NAVIGATION } from '#'
import { ScrollableJsonContainer } from '@components'
import { useStore } from '@hooks'
import type { JsonValue } from '@types'

export function AnonSetResults({
  anonSet,
  title,
}: {
  anonSet: JsonValue
  title: string
}) {
  const { setAnonSet } = useStore()
  useEffect(() => {
    setAnonSet(anonSet as string[])
  }, [setAnonSet, anonSet])

  return (
    <>
      <div className='mb-5 flex flex-row justify-between'>
        <div>
          <h2>{title} Anonset</h2>
          <h3>Results</h3>
        </div>
        <Link href='/prove/submit'>
          <button type='button' className='btn btn-secondary'>
            {NAVIGATION.PREPARE_PROOF_REQUEST}
          </button>
        </Link>
      </div>
      <ScrollableJsonContainer data={anonSet} />
    </>
  )
}
