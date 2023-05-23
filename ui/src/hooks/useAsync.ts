import { useState } from 'react'
import useSWR, { Fetcher } from 'swr'

export const useAsync = (key: string, fetcher: Fetcher) => {
  const [shouldFetch, setShouldFetch] = useState(false)
  const execute = () => setShouldFetch(true)
  const { data, error, isLoading } = useSWR(shouldFetch ? key : null, fetcher)

  return { data, error, execute, isLoading }
}
