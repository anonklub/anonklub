import { Point } from '@noble/secp256k1'
import { BigNumber, utils, Wallet } from 'ethers'
import { existsSync } from 'fs'
import { writeFile, readFile } from 'fs/promises'
import { hideBin } from 'yargs/helpers'

import yargs from 'yargs/yargs'
import { ProofRequest } from '@e2e-zk-ecdsa/shared'
import { URLS } from './constants'
import delay from 'delay'

const fetchErc20AnonSet = async ({
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

  const res = await fetch(
    `${URLS.QUERY_API}/balance/ERC20?${params.toString()}`,
  )
  return res.json()
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
  await delay(300)
  console.log('Creating proof request')
  const proofRequest = await createProofRequest({
    addresses,
    privateKey,
  })

  await delay(300)
  console.log({ proofRequest })
  await delay(300)
  console.log('Sending proof request to proving API')

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

  let addresses: string[]
  if (existsSync('./addresses.json')) {
    console.log('Using on-disk addresses.json')
    addresses = await readFile('addresses.json', 'utf8').then((res) =>
      JSON.parse(res),
    )
  } else {
    addresses = await fetchErc20AnonSet({
      min: argv.minBalance,
      tokenAddress: argv.erc20Address,
    })

    await writeFile('addresses.json', JSON.stringify(addresses, null, 2))
  }

  await delay(300)
  console.log(addresses)

  const proof = await fetchProof({
    addresses,
    privateKey: argv?.privateKey,
  }).then(async (res) => res.json())
  console.log(proof)
  await writeFile('proof.json', JSON.stringify(proof, null, 2))
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
