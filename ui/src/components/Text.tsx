export function Text({ lines }: { lines: string[] }) {
	return (
		<div className='text-center'>
			{lines.map((line, i) => (
				<p key={i}>{line}</p>
			))}
		</div>
	)
}
