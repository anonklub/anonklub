export function Text({ lines }: { lines: string[] }) {
  return (
    <div className='mb-2'>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  )
}
