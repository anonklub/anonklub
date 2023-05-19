export function ScrollableContainer({ data }: { data: string[] }) {
  return (
    <div className='nes-container is-rounded flex max-h-96 flex-row flex-wrap justify-evenly overflow-auto scroll-smooth'>
      {data.map((result, key) => (
        <span key={key} className='text-xs'>
          {result}
        </span>
      ))}
    </div>
  )
}
