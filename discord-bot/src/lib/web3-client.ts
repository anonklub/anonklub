import { createPublicClient, http, PublicClient } from 'viem'
import { sepolia } from 'viem/chains'

export const web3Client: PublicClient = createPublicClient({
	chain: sepolia,
	transport: http(),
})
