import { sepolia } from 'wagmi/chains'

function validateConfig(config: any) {
  Object.keys(config).forEach((key) => {
    const value = config[key]
    if (value === undefined || value === null)
      throw new Error(`${key} is not set`)
  })
}

const APP_NAME = 'My App'

// need to use full reference to process.env
// can't destructure or do process.env[name]
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables
const alchemyRpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

const config = {
  alchemyRpcUrl,
  appName: APP_NAME,
  chains: [sepolia],
  walletConnectProjectId,
}

validateConfig(config)

export default config
