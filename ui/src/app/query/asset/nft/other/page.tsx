'use client'
import { useState } from 'react'
import { config, getData } from '#'
import { AnonSetResults, HelpModal, Loader } from '@components'
import { useAsync, useStore } from '@hooks'

export default function Page() {
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const { anonSet, setAnonSet } = useStore()
  const { error, execute, isLoading } = useAsync(async () => {
    if (tokenAddress !== '') {
      const data = await getData<string[]>(
        `${config.urls.queryApi}/asset/nft?tokenAddress=${tokenAddress}`,
      )
      setAnonSet(data)
    }
  })
  const canFetch = tokenAddress !== ''

  if (isLoading) return <Loader />
  if (error instanceof Error) return <span>Error: {error.message}</span>
  if (anonSet !== null)
    return <AnonSetResults anonSet={anonSet} title='NFT Owners' />

  return (
    <div className='flex flex-col items-center space-y-10'>
      <div className='self-end'>
        <HelpModal content={['Provide the NFT contract address.']} />
      </div>
      <div className='nes-field w-[550px]'>
        <label>
          NFT Contract Address
          <input
            placeholder='0x99a9b7c1116f9ceeb1652de04d5969cce509b069'
            type='text'
            className='nes-input text-xs'
            value={tokenAddress}
            onChange={({ target }) => {
              setTokenAddress(target.value)
            }}
          />
        </label>
      </div>
      <button
        type='button'
        className={`nes-btn self-center ${
          canFetch ? 'is-warning' : 'is-disabled'
        }`}
        onClick={execute}
      >
        Fetch Anonset
      </button>
    </div>
  )
}
