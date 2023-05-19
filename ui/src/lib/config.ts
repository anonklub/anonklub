import { sepolia } from 'wagmi/chains'

interface Config {
  appName: string
  chains: any[]
  urls: {
    alchemy: string
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

const APP_NAME = 'My App'

// need to use full reference to process.env
// can't destructure or do process.env[name]
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables
const alchemyRpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

const config = {
  appName: APP_NAME,
  chains: [sepolia],
  urls: {
    alchemy: alchemyRpcUrl,
    queryApi: 'https://anonset-staging.fly.dev/',
  },
  walletConnectProjectId,
}

export default validateConfig(config)
