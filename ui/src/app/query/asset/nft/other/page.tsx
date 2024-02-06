'use client'
import { useState } from 'react'
import { isAddress } from 'viem'
import { config, getData } from '#'
import { AnonSetResults, HelpModal, Loader } from '@components'
import { useAsync, useStore } from '@hooks'

export default function Page() {
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const { anonSet, setAnonSet } = useStore()
  const { error, execute, isLoading } = useAsync(async () => {
    if (isAddress(tokenAddress)) {
      const data = await getData<string[]>(
        `${config.urls.queryApi}/asset/nft?tokenAddress=${tokenAddress}`,
      )
      setAnonSet(data)
    }
  })
  const canFetch = isAddress(tokenAddress)

  if (isLoading) return <Loader />
  if (error instanceof Error) return <span>Error: {error.message}</span>
  if (anonSet !== null)
    return <AnonSetResults anonSet={anonSet} title='NFT Owners' />

  return (
    <div className='flex flex-col items-center space-y-10'>
      <div className='self-end'>
        <HelpModal content={['Provide the NFT contract address.']} />
      </div>
      <div className='field'>
        <label htmlFor='nft_address'>NFT Contract Address</label>
        <input
          id='nft_address'
          placeholder='0x99a9b7c1116f9ceeb1652de04d5969cce509b069'
          type='text'
          className='input flex-auto text-center'
          value={tokenAddress}
          onChange={({ target }) => {
            setTokenAddress(target.value)
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
