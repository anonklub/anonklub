// import config from '#/config'
// import { getData } from '#/get-data'
import Link from 'next/link'
import { RESULTS as anonSet } from '@/app/query/cryptopunk/_results'

export default async function Page() {
  // const results = await getData<string[]>(`${config.urls.queryApi}/punks`)
  await new Promise((resolve, reject) => setTimeout(resolve, 1000))

  return (
    <>
      <div className='mb-3 flex flex-row justify-between'>
        <div>
          <h2>Cryptopunk Anon Set</h2>
          <h3 className='nes-text is-success'>Results</h3>
        </div>
        <Link
          href={{
            pathname: '/prove/from-on-chain/cryptopunk',
            query: { anonSet },
          }}
        >
          <button className='nes-btn is-success'>Next: Prove</button>
        </Link>
      </div>
      <div className='nes-container is-rounded flex max-h-96 flex-row flex-wrap justify-evenly overflow-auto scroll-smooth'>
        {anonSet.map((result, key) => (
          <span key={key} className='text-xs'>
            {result}
          </span>
        ))}
      </div>
    </>
  )
}
