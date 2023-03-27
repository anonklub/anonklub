import { Point } from '@noble/secp256k1'
import { BigNumber, utils, Wallet } from 'ethers'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import { ProofRequest } from '@e2e-zk-ecdsa/shared'

import { URLS } from './constants'

const fetchAnonSet = async ({
  min,
  tokenAddress,
}: {
  tokenAddress: string
  min: string
}) => {
  const params = new URLSearchParams({
    min,
    tokenAddress,
  })

  return fetch(`${URLS.QUERY_API}/balance/ERC20?${params.toString()}`)
}

const createProofRequest = async ({
  addresses,
  privateKey,
}: {
  addresses: string[]
  privateKey: string
}) => {
  const wallet = new Wallet(privateKey)
  const { address, publicKey } = wallet
  const point = Point.fromHex(publicKey.slice(2))
  const signature = await wallet.signMessage(1234n.toString())
  return new ProofRequest({
    addresses: addresses.map((address) => BigNumber.from(address).toBigInt()),
    addressIndex: addresses.indexOf(address),
    msghash: 1234n,
    pubkey: point,
    signature: utils.arrayify(signature),
  })
}
const fetchProof = async ({
  addresses,
  privateKey,
}: {
  addresses: string[]
  privateKey: string
}) => {
  const proofRequest = await createProofRequest({
    addresses,
    privateKey,
  })

  const response = await fetch(URLS.PROVING_API, {
    body: proofRequest.stringify(),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  return response.json()
}

interface Args {
  erc20Address: string
  minBalance: string
  privateKey: string
}

async function main() {
  const argv = yargs(hideBin(process.argv)).options({
    erc20Address: { alias: 'a', requiresArg: true, type: 'string' },
    minBalance: { alias: 'm', requiresArg: true, type: 'string' },
    privateKey: { alias: 'p', requiresArg: true, type: 'string' },
  }).argv as Args

  const addresses = await fetchAnonSet({
    min: argv.minBalance,
    tokenAddress: argv.erc20Address,
  }).then(async (res) => res.json())

  return fetchProof({ addresses, privateKey: argv?.privateKey }).then(
    async (res) => res.json(),
  )
}

main()
  .then(() => {
    console.log('Done')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
