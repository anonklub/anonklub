import { useCallback, useState } from 'react'

/**
 * Executes an async function and returns the result, loading state and error
 * @param asyncFn
 */
export const useAsync = <T>(asyncFn: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | undefined>(undefined)

  const execute = useCallback(() => {
    setIsLoading(true)
    setData(undefined)
    setError(undefined)

    void (async () => {
      try {
        const response = await asyncFn()
        setData(response)
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Unexpected error'))
      } finally {
        setIsLoading(false)
      }
    })()
  }, [asyncFn])

  return { data, error, execute, isLoading }
}
