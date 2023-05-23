import { Chain } from 'wagmi'
import { sepolia } from 'wagmi/chains'

interface Config {
  chains: Chain[]
  urls: {
    alchemy: string
    proveApi: string
    queryApi: string
  }
  walletConnectProjectId: string
}

// need to use full reference to process.env
// can't destructure or do process.env[name]
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables
const alchemyRpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
if (alchemyRpcUrl === undefined) throw new Error('ALCHEMY_RPC_URL is not set')

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
if (walletConnectProjectId === undefined)
  throw new Error('WALLET_CONNECT_PROJECT_ID is not set')

const proveApiUrl = process.env.NEXT_PUBLIC_PROVE_API_URL
if (proveApiUrl === undefined) throw new Error('PROVE_API_URL is not set')

const queryApiUrl = process.env.NEXT_PUBLIC_QUERY_API_URL
if (queryApiUrl === undefined) throw new Error('QUERY_API_URL is not set')

const config: Config = {
  chains: [sepolia],
  urls: {
    alchemy: alchemyRpcUrl,
    proveApi: proveApiUrl,
    queryApi: queryApiUrl,
  },
  walletConnectProjectId,
}

export default config
