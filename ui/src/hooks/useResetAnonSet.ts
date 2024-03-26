import { useEffect } from 'react'
import { useStore } from './useStore'

/**
 * Reset the anon set when the component mounts.
 */
export const useResetAnonSet = () => {
	const { resetAnonSet } = useStore()
	useEffect(() => {
		resetAnonSet()
	}, [resetAnonSet])
}
