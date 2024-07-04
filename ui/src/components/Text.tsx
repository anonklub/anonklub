export function Text({ lines }: { lines: string[] }) {
  return (
    <div className='text-center'>
      {lines.map((line) => <p key={line}>{line}</p>)}
    </div>
  )
}
