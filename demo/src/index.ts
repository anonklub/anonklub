import delay from 'delay'
import { ethers } from 'ethers'
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import inquirer from 'inquirer'
import { fetchErc20AnonSet } from './fetch-anon-set'
import { fetchProof } from './fetch-proof'

interface Args {
  erc20Address: string
  fetchAnonSet: boolean
  minBalance: string
  privateKey: string
}

const QUESTIONS = [
  {
    default: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    message: 'ERC20 address you want to query',
    name: 'erc20Address',
    suffix: ' [Example: 0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72]',
    type: 'string',
    validate: (answer: string) =>
      ethers.utils.isAddress(answer) || 'Invalid address',
  },
  {
    message:
      'Minimum balance of ERC20 one must own to be part of the anonymity set',
    name: 'minBalance',
    suffix: ' [Example: 10000]',
    type: 'string',
    validate: (answer: string) =>
      answer.match(/^[0-9]+$/)?.length !== undefined || 'Invalid number',
  },
  {
    message:
      'Private key of the address you want to prove is part of the anonymity set',
    name: 'privateKey',
    suffix:
      ' [Example: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef]',
    type: 'string',
    validate: (answer: string) =>
      answer.match(/^0x[0-9a-fA-F]{64}$/)?.length !== undefined ||
      'Invalid private key',
  },
]

async function main() {
  const { erc20Address, fetchAnonSet, minBalance, privateKey }: Args =
    await inquirer.prompt(QUESTIONS)

  let addresses: string[]

  if (fetchAnonSet || !existsSync('addresses.json')) {
    console.log('Fetching addresses from query API')

    addresses = await fetchErc20AnonSet({
      min: minBalance,
      tokenAddress: erc20Address,
    })
    await writeFile('addresses.json', JSON.stringify(addresses))
  } else {
    console.log('Loading addresses from file')
    addresses = JSON.parse(await readFile('addresses.json', 'utf-8'))
  }

  await delay(300)
  console.log(addresses.slice(0, 10))

  // TODO: refactor so that a pre-generated signature is passed in instead of private key
  await fetchProof({
    addresses,
    privateKey,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
