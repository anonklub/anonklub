import { API_URLS } from './constants'

export const fetchErc20AnonSet = async ({
  min,
  tokenAddress,
}: {
  tokenAddress: string
  min: string
}) => {
  const params = new URLSearchParams({ min, tokenAddress })

  const res = await fetch(
    `${API_URLS.QUERY}/balance/ERC20?${params.toString()}`,
  )
  return res.json()
}
