import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Executes an async function (by default immediately) and returns the result, loading state and error
 * @param asyncFn - The async function to execute
 * @param execImmediately - Whether to execute the function immediately (default: true)
 */
export const useAsync = <T>(
  asyncFn: () => Promise<T>,
  execImmediately = true,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [data, setData] = useState<T | undefined>(undefined)
  const once = useRef(false)

  const execute = useCallback(() => {
    // guard against multiple executions
    if (once.current) return

    once.current = true
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

  useEffect(() => {
    if (execImmediately) execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute])

  return { data, error, execute, isLoading }
}
