import { RESULTS } from '@/app/query/cryptopunk/_results'

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return RESULTS
}

export default async function Page() {
  const results = await getData()

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
