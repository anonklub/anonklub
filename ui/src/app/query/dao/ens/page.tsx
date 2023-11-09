'use client'
import { useState } from 'react'
import { config, getData } from '#'
import { AnonSetResults, HelpModal, Loader } from '@components'
import { useAsync, useStore } from '@hooks'

// TODO extract in shared lib
enum Choice {
  FOR = 'FOR',
  AGAINST = 'AGAINST',
  ABSTAIN = 'ABSTAIN',
}

export default function Page() {
  // console.log(Object.values(Choice))
  const [choice, setChoice] = useState<Choice>(Choice.FOR)
  const [id, setId] = useState<string>('')
  const { anonSet, setAnonSet } = useStore()
  const { error, execute, isLoading } = useAsync(async () => {
    if (id !== '') {
      const data = await getData<string[]>(
        `${config.urls.queryApi}/ens-proposal-voters?id=${id}&choice=${choice}`,
      )
      setAnonSet(data)
    }
  })
  const canFetch = id !== ''

  if (isLoading) return <Loader />
  if (error instanceof Error) return <span>Error: {error.message}</span>
  if (anonSet !== null)
    return <AnonSetResults anonSet={anonSet} title='ENS Proposal Voters' />

  return (
    <div className='flex flex-col items-center space-y-10'>
      <div className='self-end'>
        <HelpModal
          content={[
            'ENS Proposal ID: can be found at https://www.tally.xyz/gov/ens/proposals. ID is in the URL path of an individual proposal (https://www.tally.xyz/gov/ens/proposal/[id]).',
            'Choice: choice addresses should have voted to be part of the Anonset.',
          ]}
        />
      </div>
      <div className='nes-field w-[550px]'>
        <label>
          ENS Proposal ID
          <input
            placeholder='45461903078948131870051132081249892009497709518413744958551889217805827301425'
            type='text'
            className='nes-input text-xs'
            value={id}
            onChange={({ target }) => {
              setId(target.value)
            }}
          />
        </label>
      </div>
      <div className='nes-field'>
        <label>
          Choice
          <div className='nes-select'>
            <select
              value={choice}
              required
              onChange={({ target }) => {
                setChoice(target.value as Choice)
              }}
            >
              {Object.values(Choice).map((_choice) => (
                <option
                  key={_choice}
                  value={_choice}
                  selected={_choice === choice}
                >
                  {_choice}
                </option>
              ))}
            </select>
          </div>
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
