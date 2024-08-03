import { PHASE_PRODUCTION_BUILD } from 'next/constants'
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
    queryApi: string
  }
  walletConnectProjectId: string
}

// need to use full reference to process.env, can't destructure or do process.env[name]
// https://nextjs.org/docs/app/api-reference/next-config-js/env
const AUTH_HEADER_NAME = process.env.AUTH_HEADER_NAME ?? ''
const DISCORD_BOT_API_KEY = process.env.DISCORD_BOT_API_KEY ?? ''
const NEXT_PUBLIC_QUERY_API_URL = process.env.NEXT_PUBLIC_QUERY_API_URL ?? ''
const NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ''

if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
  for (
    const [key, value] of Object.entries({
      AUTH_HEADER_NAME,
      DISCORD_BOT_API_KEY,
      NEXT_PUBLIC_QUERY_API_URL,
      NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    })
  ) {
    if (value === '') throw new Error(`Missing environment variable ${key}`)
  }
}

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
    queryApi: NEXT_PUBLIC_QUERY_API_URL,
  },
  walletConnectProjectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
}
