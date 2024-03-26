import Link from 'next/link'

export function Screen({
	buttons,
	question,
}: {
	question: string
	buttons: Array<{
		href: string
		text: string
	}>
}) {
	return (
		<div className='flex flex-col items-center justify-center'>
			<h2 className='header'>{question}</h2>
			<div className='buttons-row'>
				{buttons.map(({ href, text }) => (
					<Link key={href} href={href} className='btn btn-primary'>
						{text}
					</Link>
				))}
			</div>
		</div>
	)
}
