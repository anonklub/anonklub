import Link from 'next/link'
import { ReactNode } from 'react'

export enum Links {
  Twitter = 'https://twitter.com/PrivacyScaling',
  Github = 'https://github.com/privacy-scaling-explorations/e2e-zk-ecdsa',
  Docs = 'https://privacy-scaling-explorations.github.io/e2e-zk-ecdsa/',
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
