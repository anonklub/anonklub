import Link from 'next/link'
import type { AnchorHTMLAttributes, FC, ReactNode } from 'react'

export enum Links {
  Twitter = 'https://twitter.com/PrivacyScaling',
  Github = 'https://github.com/anonklub/anonklub',
  Docs = 'https://docs.anonklub.xyz',
}
type ExternalLinkProps = {
  children: ReactNode
  href: Links
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const ExternalLink: FC<ExternalLinkProps> = ({
  children,
  href,
  ...props
}) => (
  <Link target='_blank' href={href} {...props}>
    {children}
  </Link>
)
