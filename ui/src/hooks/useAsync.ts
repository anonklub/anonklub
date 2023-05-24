import { useState } from 'react'
import useSWR, { Fetcher } from 'swr'
import { useBlockNumber } from 'wagmi'

export const useAsync = (fetcher: Fetcher) => {
  // use block number as a key to invalidate cache
  const block = useBlockNumber()
  const [shouldFetch, setShouldFetch] = useState(false)
  const execute = () => setShouldFetch(true)
  const { data, error, isLoading } = useSWR(
    shouldFetch ? block : null,
    fetcher,
    { revalidateOnFocus: false }, // don't revalidate if focusing tab/window out because queries can be expensive/long
  )

  return { data, error, execute, isLoading }
}
