import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useGoBackOnClickOutside = (
	containingClass = 'error-container',
) => {
	const router = useRouter()
	const goBack = () => {
		router.back()
	}

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if ((event.target as HTMLElement).closest(`.${containingClass}`) === null)
				goBack()
		}

		document.addEventListener('click', handleOutsideClick)

		return () => {
			document.removeEventListener('click', handleOutsideClick)
		}
	}, [goBack])

	return goBack
}
