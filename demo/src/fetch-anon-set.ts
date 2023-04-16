import ora from 'ora'
import { Choice } from './cli/prompts'
import { API_URLS } from './constants'

const fetchAnonSet = async (url): Promise<string[]> => {
  const spinner = ora(
    'Fetching Anonymity Set from 3rd party ethereum indexing services...',
  )

  spinner.start()
  const res = await fetch(url)
  const anonSet = await res.json()
  spinner.stop()

  return anonSet
}

export const fetchErc20AnonSet = async ({
  min,
  tokenAddress,
}: {
  tokenAddress: string
  min: string
}) =>
  fetchAnonSet(
    `${API_URLS.QUERY}/balance/ERC20?${new URLSearchParams({
      min,
      tokenAddress,
    }).toString()}`,
  )

export const fetchEthAnonSet = async ({ minBalance }: { minBalance: string }) =>
  fetchAnonSet(`${API_URLS.QUERY}/balance/ETH?min=${minBalance}`)

export const fetchEnsVotersAnonSet = async ({
  choice,
  id,
}: {
  choice: Choice
  id: string
}) =>
  fetchAnonSet(
    `${API_URLS.QUERY}/balance/ERC20?${new URLSearchParams({
      choice,
      id,
    }).toString()}`,
  )

export const fetchPunksAnonSet = async () =>
  fetchAnonSet(`${API_URLS.QUERY}/punks`)
