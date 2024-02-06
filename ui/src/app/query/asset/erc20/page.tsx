'use client'
import { useState } from 'react'
import { isAddress } from 'viem'
import { config, getData } from '#'
import { AnonSetResults, HelpModal, Loader } from '@components'
import { useAsync, useStore } from '@hooks'

export default function Page() {
  const [min, setMin] = useState<number>(0)
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const { anonSet, setAnonSet } = useStore()
  const { error, execute, isLoading } = useAsync(async () => {
    if (isAddress(tokenAddress) && min > 0) {
      const data = await getData<string[]>(
        `${config.urls.queryApi}/asset/ERC20?min=${min}&tokenAddress=${tokenAddress}`,
      )
      setAnonSet(data)
    }
  })
  const canFetch = isAddress(tokenAddress) && min > 0

  if (isLoading) return <Loader />
  if (error instanceof Error) return <span>Error: {error.message}</span>
  if (anonSet !== null)
    return <AnonSetResults anonSet={anonSet} title='ERC20 Balance' />

  return (
    <div className='flex flex-col items-center space-y-10'>
      <div className='self-end'>
        <HelpModal
          content={[
            'Provide the ERC20 token address and the minimum amount of tokens one should own to be part of the anonset.',
          ]}
        />
      </div>
      <div className='field'>
        <label htmlFor='erc20_address'>ERC20 Token Address</label>
        <input
          id='erc20_address'
          placeholder='0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72'
          type='text'
          className='input flex-auto text-center'
          value={tokenAddress}
          onChange={({ target }) => {
            setTokenAddress(target.value)
          }}
        />
      </div>
      <div className='field'>
        <label htmlFor='erc20_amount'>Min</label>
        <input
          id='erc20_amount'
          min={0}
          step={1}
          type='number'
          className='input w-1/4 flex-none'
          value={min}
          onChange={({ target }) => {
            setMin(parseInt(target.value))
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
