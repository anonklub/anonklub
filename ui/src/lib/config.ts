import type { Chain } from 'wagmi'
import { sepolia } from 'wagmi/chains'

interface Config {
  appTitle: string
  chains: Chain[]
  message: string
  proofAttachmentName: string
  typebot: string
  urls: {
    discordBot: string
    queryApi: string
  }
  walletConnectProjectId: string
}

// need to use full reference to process.env, can't destructure or do process.env[name]
// https://nextjs.org/docs/app/api-reference/next-config-js/env
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ''
if (walletConnectProjectId === '') {
  // this means next build will fail
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    throw new Error(
      'Missing environment variable NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID',
    )
  }
  console.warn(
    'Missing environment variable NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID',
  )
}

const discordBot = process.env.DISCORD_BOT_URL ?? ''
if (discordBot === undefined) throw new Error('No discord bot url provided')

const queryApi = process.env.NEXT_PUBLIC_QUERY_API_URL
if (queryApi === undefined) throw new Error('No query api url provided')

export const config: Config = {
  appTitle: 'Anonklub',
  chains: [sepolia],
  message: 'I am generating an anonymous proof of Ethereum address ownership with AnonKlub.',
  proofAttachmentName: 'anonklub-proof.bin',
  typebot: 'anonklub-feedback',
  urls: {
    discordBot,
    queryApi,
  },
  walletConnectProjectId,
}
