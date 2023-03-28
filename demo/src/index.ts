import { Point } from '@noble/secp256k1'
import delay from 'delay'
import { BigNumber, utils, Wallet } from 'ethers'
import { writeFile } from 'fs'
import { readFile } from 'fs/promises'
import http from 'http'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

import { ProofRequest } from '@e2e-zk-ecdsa/shared'
import { PROVING_API_HOST, URLS } from './constants'

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
  console.log('Creating proof request')
  const proofRequest = await createProofRequest({
    addresses,
    privateKey,
  })

  await delay(300)
  const body = proofRequest.stringify()
  console.log({ proofRequest: body })
  await delay(300)
  console.log('Sending proof request to proving API')

  const options = {
    headers: {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'application/json',
    },
    host: PROVING_API_HOST,
    method: 'POST',
    path: '/',
    port: 3000,
  }

  const req = http.request(options, function (res) {
    let response = ''

    res.setEncoding('utf8')
    res.on('data', function (chunk: string) {
      response += chunk
    })
    res.on('end', function () {
      console.log('proof: ' + response)
      // write response to json file
      writeFile('proof.json', response, (err) => {
        if (err !== null) {
          console.log(err)
        } else {
          console.log('proof.json written')
        }
      })
    })
  })

  req.write(body)
  req.end()

  // TODO: this time out, use messaging queue
  // const response = await fetch(URLS.PROVING_API, {
  //   body,
  //   headers: {
  //     'Content-Length': Buffer.byteLength(body).toString(),
  //     'Content-Type': 'application/json',
  //   },
  //   method: 'POST',
  // })
  //
  // return response.json()
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

  console.log('Fetching addresses from query API')
  await delay(300)
  const addresses = await fetchErc20AnonSet({
    min: argv.minBalance,
    tokenAddress: argv.erc20Address,
  })

  // loading addresses from file
  // const addresses = JSON.parse(await readFile('addresses.json', 'utf-8'))

  await fetchProof({
    addresses,
    privateKey: argv?.privateKey,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
