import { URLS } from './constants'

export const fetchErc20AnonSet = async ({
  min,
  tokenAddress,
}: {
  tokenAddress: string
  min: string
}) => {
  const params = new URLSearchParams({ min, tokenAddress })

  const res = await fetch(
    `${URLS.QUERY_API}/balance/ERC20?${params.toString()}`,
  )
  return res.json()
}
