import { Chain } from 'wagmi'
import { sepolia } from 'wagmi/chains'

interface Config {
  appTitle: string
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
let alchemyRpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
let walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
let proveApiUrl = process.env.NEXT_PUBLIC_PROVE_API_URL
let queryApiUrl = process.env.NEXT_PUBLIC_QUERY_API_URL

if (process.env.NEXT_PUBLIC_NODE_ENV !== 'test') {
  if (alchemyRpcUrl === undefined) throw new Error('ALCHEMY_RPC_URL is not set')
  if (walletConnectProjectId === undefined)
    throw new Error('WALLET_CONNECT_PROJECT_ID is not set')
  if (proveApiUrl === undefined) throw new Error('PROVE_API_URL is not set')
  if (queryApiUrl === undefined) throw new Error('QUERY_API_URL is not set')
} else {
  // set dummy values to allow tests and CI build checks to pass
  alchemyRpcUrl ??= 'http://alchemy.com'
  walletConnectProjectId ??= 'foo'
  proveApiUrl ??= 'http://localhost:3000/api/prove'
  queryApiUrl ??= 'http://localhost:3000/api/query'
}

export const config: Config = {
  appTitle: 'Anonklub',
  chains: [sepolia],
  urls: {
    alchemy: alchemyRpcUrl,
    proveApi: proveApiUrl,
    queryApi: queryApiUrl,
  },
  walletConnectProjectId,
}
