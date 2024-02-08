'use client'
import { useState } from 'react'
import { config, getData } from '#'
import { AnonSetResults, Loader } from '@components'
import { useFetchOnChain, useSetHelp, useStore } from '@hooks'

export default function Page() {
  useSetHelp([
    'Provide the ERC20 token address and the minimum amount of tokens one should own to be part of the anonset.',
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
    <div className='flex flex-col items-center space-y-10'>
      <div className='field'>
        <label htmlFor='eth_amount'>Min</label>
        <input
          id='eth_amount'
          min={100}
          max={100_000_000}
          step={1}
          type='number'
          className='input w-1/4 text-center'
          value={min}
          onChange={({ target }) => {
            setMin(parseInt(target.value))
          }}
        />
      </div>

      <button
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
