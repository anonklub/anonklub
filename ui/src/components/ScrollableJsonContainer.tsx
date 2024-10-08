import type { JsonValue } from '@types'

export function ScrollableJsonContainer({
  data,
}: {
  data: JsonValue | Uint8Array
}) {
  return (
    <>
      {Array.isArray(data) && <span className='text-xl'>Count: {data.length}</span>}
      <div className='scrollable-json-container'>
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  )
}
