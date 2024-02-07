'use client'
import { useState } from 'react'
import { config, getData } from '#'
import { AnonSetResults, HelpModal, Loader } from '@components'
import { useFetchOnChain, useStore } from '@hooks'

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
  const { error, execute, isLoading } = useFetchOnChain(async () => {
    if (id !== '') {
      const data = await getData<string[]>(
        `${config.urls.queryApi}/dao/ens?id=${id}&choice=${choice}`,
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
      <div className='field'>
        <label htmlFor='ens_proposal_id'>ENS Proposal ID</label>
        <input
          id='ens_proposal_id'
          placeholder='45461903078948131870051132081249892009497709518413744958551889217805827301425'
          type='text'
          className='input flex-auto text-center'
          value={id}
          onChange={({ target }) => {
            setId(target.value)
          }}
        />
      </div>
      <div className='field'>
        <label htmlFor='choice'>Choice</label>
        <select
          className='select w-25 text-center'
          id='choice'
          value={choice}
          required
          onChange={({ target }) => {
            setChoice(target.value as Choice)
          }}
        >
          {Object.values(Choice).map((_choice) => (
            <option key={_choice} value={_choice}>
              {_choice}
            </option>
          ))}
        </select>
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
