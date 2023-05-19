import config from '#/config'
import { getData } from '#/get-data'

export default async function Page() {
  const results = await getData<string[]>(`${config.urls.queryApi}/punks`)

  return (
    <>
      <h2>Cryptopunk Anon Set</h2>
      <div className='flex flex-col space-y-3'>
        <h3>Results</h3>
        <div className='nes-container is-rounded flex max-h-96 flex-row flex-wrap justify-evenly overflow-auto scroll-smooth'>
          {results.map((result, key) => (
            <span key={key} className='text-xs'>
              {result}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
