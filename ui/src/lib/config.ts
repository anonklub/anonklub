import { Chain } from 'wagmi'
import { sepolia } from 'wagmi/chains'

interface Config {
  appName: string
  chains: Chain[]
  urls: {
    alchemy: string
    proveApi: string
    queryApi: string
  }
  walletConnectProjectId: string
}

function validateConfig(config: any): Config {
  Object.keys(config).forEach((key) => {
    const value = config[key]
    if (value === undefined || value === null)
      console.error(`${key} is not set`)
  })

  return config
}

// need to use full reference to process.env
// can't destructure or do process.env[name]
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables
const alchemyRpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
const proveApiUrl = process.env.NEXT_PUBLIC_PROVE_API_URL
const queryApiUrl = process.env.NEXT_PUBLIC_QUERY_API_URL

const config = {
  chains: [sepolia],
  urls: {
    alchemy: alchemyRpcUrl,
    proveApi: proveApiUrl,
    queryApi: queryApiUrl,
  },
  walletConnectProjectId,
}

export default validateConfig(config)
