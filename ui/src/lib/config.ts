import { Chain } from 'wagmi'
import { sepolia } from 'wagmi/chains'

interface Config {
  appTitle: string
  chains: Chain[]
  urls: {
    proveApi: string
    queryApi: string
  }
  verifier: {
    address: `0x${string}`
    chainId: number
  }
  walletConnectProjectId: string
}

// need to use full reference to process.env, can't destructure or do process.env[name]
// https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables
const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? ''
const proveApiUrl = process.env.NEXT_PUBLIC_PROVE_API_URL ?? ''
const queryApiUrl = process.env.NEXT_PUBLIC_QUERY_API_URL ?? ''
const verifierAddress = process.env.NEXT_PUBLIC_VERIFIER_ADDRESS ?? ''
const verifierChainId = process.env.NEXT_PUBLIC_VERIFIER_CHAIN_ID ?? ''

;[
  [walletConnectProjectId, 'NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID'],
  [proveApiUrl, 'NEXT_PUBLIC_PROVE_API_URL'],
  [queryApiUrl, 'NEXT_PUBLIC_QUERY_API_URL'],
].forEach(([value, name]) => {
  if (value === '') {
    // this means next build will fail
    if (process.env.NEXT_PHASE === 'phase-production-build')
      throw new Error(`Missing environment variable ${name}`)
    else console.warn(`Missing environment variable ${name}`)
  }
})

if (!verifierAddress.startsWith('0x')) {
  if (process.env.NEXT_PHASE === 'phase-production-build')
    throw new Error(`Invalid verifier address ${verifierAddress}`)
  else console.warn(`Invalid verifier address ${verifierAddress}`)
}

if (isNaN(parseInt(verifierChainId))) {
  if (process.env.NEXT_PHASE === 'phase-production-build')
    throw new Error(`Invalid verifier chain id ${verifierChainId}`)
  else console.warn(`Invalid verifier chain id ${verifierChainId}`)
}

export const config: Config = {
  appTitle: 'Anonklub',
  chains: [sepolia],
  urls: {
    proveApi: proveApiUrl,
    queryApi: queryApiUrl,
  },
  verifier: {
    // @ts-expect-error we already checked that verifierAddress starts with 0x
    address: verifierAddress,
    chainId: parseInt(verifierChainId),
  },
  walletConnectProjectId,
}
