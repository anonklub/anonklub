export function Star({ full, text }: { full: boolean; text?: string }) {
  return (
    <p>
      <i className={`nes-icon is-small star ${full ? '' : 'is-empty'}`}></i>{' '}
      {text}
    </p>
  )
}
