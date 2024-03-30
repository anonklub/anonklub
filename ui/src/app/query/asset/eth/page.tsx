'use client'
import { useState } from 'react'
import { config, getData } from '#'
import { AnonSetResults, Loader } from '@components'
import { useFetchOnChain, useSetHelp, useStore } from '@hooks'

export default function Page() {
  useSetHelp([
    'Provide the minimum amount of ETH one should own to be part of the anonset.',
  ])
  const [min, setMin] = useState<number>(100)
  const { anonSet, setAnonSet } = useStore()
  const { error, execute, isLoading } = useFetchOnChain(async () => {
    if (min > 0) {
      const data = await getData<string[]>(
        `${config.urls.queryApi}/asset/ETH?min=${min}`,
      )
      setAnonSet(data)
    }
  })
  const canFetch = min > 0

  if (isLoading) return <Loader />
  if (error instanceof Error) return <span>Error: {error.message}</span>
  if (anonSet !== null)
    return <AnonSetResults anonSet={anonSet} title='ETH Balance' />

  return (
    <div className='mt-40 flex flex-col items-center space-y-10 px-60'>
      <div className='field justify-between'>
        <label htmlFor='eth_amount'>Min</label>
        <input
          id='eth_amount'
          min={100}
          max={100_000_000}
          step={1}
          type='number'
          className='input text-center'
          value={min}
          onChange={({ target }) => {
            setMin(Number.parseInt(target.value))
          }}
        />
      </div>

      <button
        type='button'
        className={`btn self-center ${
          canFetch ? 'btn-primary' : 'is-disabled'
        }`}
        onClick={execute}
      >
        Fetch Anonset
      </button>
    </div>
  )
}
