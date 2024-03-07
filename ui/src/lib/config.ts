import { Chain } from 'wagmi'
import { sepolia } from 'wagmi/chains'

interface Config {
  appTitle: string
  chains: Chain[]
  message: string
  typebot: string
  urls: {
    queryApi: string
  }
  walletConnectProjectId: string
}

// need to use full reference to process.env, can't destructure or do process.env[name]
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ''

;[[walletConnectProjectId, 'NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID']].forEach(
  ([value, name]) => {
    if (value === '') {
      // this means next build will fail
      if (process.env.NEXT_PHASE === 'phase-production-build')
        throw new Error(`Missing environment variable ${name}`)
      else console.warn(`Missing environment variable ${name}`)
    }
  },
)

export const config: Config = {
  appTitle: 'Anonklub',
  chains: [sepolia],
  message:
    'I am generating an anonymous proof of Ethereum address ownership with AnonKlub.',
  typebot: 'anonklub-feedback',
  urls: {
    queryApi: 'https://anonset.fly.dev',
  },
  walletConnectProjectId,
}
