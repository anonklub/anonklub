import { useEffect } from 'react'
import { useStore } from './useStore'

/**
 * Reset the anon set when the component mounts.
 */
export const useResetProofRequest = () => {
  const { resetProofRequest } = useStore()
  useEffect(() => {
    resetProofRequest()
  }, [resetProofRequest])
}
