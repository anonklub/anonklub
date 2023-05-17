import { EthereumClient } from '@web3modal/ethereum'
import config from '#/config'
import { wagmiConfig } from '#/wagmi'

export const ethereumClient = new EthereumClient(wagmiConfig, config.chains)
