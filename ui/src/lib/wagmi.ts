import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import config from '#/config'

const { chains, walletConnectProjectId: projectId } = config
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId, version: 1 }),
  publicClient,
})
