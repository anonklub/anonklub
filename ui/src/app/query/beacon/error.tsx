'use client'
import { ErrorContainer } from '@components'

export default function Error({
	error,
}: {
	error: Error & { digest?: string }
}) {
	return <ErrorContainer message={error.message} />
}
