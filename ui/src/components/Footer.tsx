import Image from 'next/image'
import { ExternalLink, Links } from '@components'

export function Footer() {
	return (
		<section className='icon-list flex flex-row items-center justify-center space-x-2'>
			<ExternalLink href={Links.Twitter} className='footer-link'>
				<Image src='/twitter.svg' width={25} height={25} alt='twitter icon' />
			</ExternalLink>
			<ExternalLink href={Links.Docs} className='footer-link'>
				Docs
			</ExternalLink>
			<ExternalLink href={Links.Github} className='footer-link'>
				<Image src='/github.svg' width={25} height={25} alt='github icon' />
			</ExternalLink>
		</section>
	)
}
