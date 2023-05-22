import { JSONValue } from '@components'

export function ScrollableJsonContainer({ data }: { data: JSONValue }) {
  return (
    <div className='nes-container is-rounded flex max-h-[325px] flex-row flex-wrap justify-evenly overflow-auto scroll-smooth'>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
