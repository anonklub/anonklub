import { useStore } from '@/hooks/useStore'
import { useEffect } from 'react'

/**
 * Reset the anon set when the component mounts.
 */
export const useResetProofRequest = () => {
  const { resetProofRequest } = useStore()
  useEffect(() => {
    resetProofRequest()
  }, [resetProofRequest])
}
