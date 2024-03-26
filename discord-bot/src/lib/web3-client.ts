import { createPublicClient, http, type PublicClient } from 'viem'
import { sepolia } from 'viem/chains'

export const web3Client: PublicClient = createPublicClient({
	chain: sepolia,
	transport: http(),
})
