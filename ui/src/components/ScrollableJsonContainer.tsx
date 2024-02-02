import { JSONValue } from '@components'

export function ScrollableJsonContainer({ data }: { data: JSONValue }) {
  return (
    <>
      {Array.isArray(data) && (
        <span className='text-xl'>Count: {data.length}</span>
      )}
      <div className='scrollable-json-container'>
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  )
}
