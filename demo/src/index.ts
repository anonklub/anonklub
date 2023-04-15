import delay from 'delay'
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import inquirer from 'inquirer'
import { ProofRequest } from '@anonset/membership'
import { API_URLS } from './constants'
import { fetchErc20AnonSet } from './fetch-anon-set'
import { CLI_QUESTIONS } from './cli/questions'

interface Args {
  erc20Address: string
  fetchAnonSet: boolean
  message: string
  minBalance: string
  rawSignature: string
}

async function main() {
  const {
    erc20Address,
    fetchAnonSet,
    message,
    minBalance,
    rawSignature,
  }: Args = await inquirer.prompt(CLI_QUESTIONS)

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

  const proofRequest = new ProofRequest({
    addresses,
    message,
    rawSignature,
    url: API_URLS.PROVE,
  })

  const jobResponse = await proofRequest.submit()
  console.log(jobResponse)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
