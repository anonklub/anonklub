// import config from '#/config'
// import { getData } from '#/get-data'
import Link from 'next/link'
import { RESULTS as anonSet } from '@/app/query/cryptopunk/_results'
import { ScrollableContainer } from '@components'

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
            pathname: '/prove/submit-request',
            query: { anonSet },
          }}
        >
          <button className='nes-btn is-success'>{'=>'} Submit Proof</button>
        </Link>
      </div>
      <ScrollableContainer data={anonSet} />
    </>
  )
}
