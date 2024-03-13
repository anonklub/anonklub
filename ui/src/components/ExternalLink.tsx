import Link from 'next/link'
import { ReactNode } from 'react'

export enum Links {
  Twitter = 'https://twitter.com/PrivacyScaling',
  Github = 'https://github.com/anonklub/anonklub',
  Docs = 'https://docs.anonklub.xyz',
}

export const ExternalLink = ({
  children,
  href,
  ...props
}: {
  children: ReactNode
  href: Links
  [p: string]: any
}) => (
  <Link target='_blank' href={href} {...props}>
    {children}
  </Link>
)
