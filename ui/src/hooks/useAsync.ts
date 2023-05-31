import { useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import { useBlockNumber } from 'wagmi'

export const useAsync = <T>(fetcher: Fetcher<T>, key?: string) => {
  // use block number as a key to invalidate cache
  const block = useBlockNumber()
  const [shouldFetch, setShouldFetch] = useState(false)
  const execute = () => setShouldFetch(true)
  const { data, error, isLoading } = useSWR(
    key === undefined ? (shouldFetch ? block : null) : key,
    fetcher,
    { revalidateOnFocus: false }, // don't revalidate if focusing tab/window out because queries can be expensive/long
  )

  return { data, error, execute, isLoading }
}
