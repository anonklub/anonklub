import { ExternalLink, Links } from '@components'

export function Footer() {
  return (
    <section className='icon-list flex flex-row items-center justify-center space-x-2'>
      <ExternalLink href={Links.Twitter}>
        <i className='nes-icon twitter'></i>
      </ExternalLink>
      <ExternalLink href={Links.Github}>
        <i className='nes-icon github'></i>
      </ExternalLink>
      <ExternalLink href={Links.Docs}>Docs</ExternalLink>
    </section>
  )
}
