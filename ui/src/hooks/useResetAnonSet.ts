import { useStore } from '@hooks'
import { useEffect } from 'react'

/**
 * Reset the anon set when the component mounts.
 */
export const useResetAnonSet = () => {
  const { resetAnonSet } = useStore()
  useEffect(() => {
    resetAnonSet()
  }, [resetAnonSet])
}
