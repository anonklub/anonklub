// create a component that render text broken into lines in several <p> tags

export default function Text({ lines }: { lines: string[] }) {
  return (
    <div className='mb-2'>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  )
}
