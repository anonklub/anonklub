import type { JSONValue } from './JsonFileInput'

export function ScrollableJsonContainer({
  data,
}: {
  data: JSONValue | Uint8Array
}) {
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
