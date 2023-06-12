# Circom Circuits

## `.zkey` file

[Stored on IPFS](https://bafybeidvy5mfoxm57sze7juqnzafvkzpbspj4j2tdd3g6n6wss4o4mgnhe.ipfs.w3s.link/)

## Solidity Verifier

## Deployment

1. Set `SEPOLIA_RPC_URL` and `VERIFIER_DEPLOYER_PRIVATEKEY`, `ETHERSCAN_API_KEY` environment variables.
2. `pnpm deploy.sepolia`

## Deployed contracts

| Network | Address                                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Sepolia | [`0x893f293e3918a179bf87fb772206e9927db61b0c`](https://sepolia.etherscan.io/address/0x893f293e3918a179bf87fb772206e9927db61b0c#code) |

## Verification
1. Generate read call inputs: `pnpm generate-call`
2. Paste input to [etherscan](https://sepolia.etherscan.io/address/0x893f293e3918a179bf87fb772206e9927db61b0c#readContract) (verifyProof read call)
