import type { Chain } from 'wagmi'
import { sepolia } from 'wagmi/chains'

interface Config {
  appTitle: string
  auth: {
    header: string
    secret: string
  }
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

const AUTH_HEADER_NAME = process.env.AUTH_HEADER_NAME ?? ''
if (AUTH_HEADER_NAME === '') throw new Error('No AUTH_HEADER_NAME provided')

const DISCORD_BOT_API_KEY = process.env.DISCORD_BOT_API_KEY ?? ''
if (DISCORD_BOT_API_KEY === '') throw new Error('No DISCORD_BOT_API_KEY provided')

const discordBot = process.env.DISCORD_BOT_URL ?? ''
if (discordBot === '') throw new Error('No DISCORD_BOT_URL provided')

const queryApi = process.env.NEXT_PUBLIC_QUERY_API_URL ?? ''
if (queryApi === '') throw new Error('No QUERY_API_URL provided')

export const config: Config = {
  auth: {
    header: AUTH_HEADER_NAME,
    secret: DISCORD_BOT_API_KEY,
  },
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
