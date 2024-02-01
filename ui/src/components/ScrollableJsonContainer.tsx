import { JSONValue } from '@components'

export function ScrollableJsonContainer({ data }: { data: JSONValue }) {
  return (
    <>
      {Array.isArray(data) && (
        <span className='nes-text is-primary text-xl'>
          Count: {data.length}
        </span>
      )}
      <div className='nes-container is-rounded flex max-h-[325px] overflow-auto scroll-smooth'>
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  )
}
