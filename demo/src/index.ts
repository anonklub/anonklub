import delay from 'delay'
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import { fetchErc20AnonSet } from './fetch-anon-set'
import { fetchProof } from './fetch-proof'

interface Args {
  erc20Address: string
  fetchAnonSet: boolean
  minBalance: string
  privateKey: string
}

async function main() {
  const argv = yargs(hideBin(process.argv)).options({
    erc20Address: { alias: 'a', requiresArg: true, type: 'string' },
    fetchAnonSet: { alias: 'f', requiresArg: false, type: 'boolean' },
    minBalance: { alias: 'm', requiresArg: true, type: 'string' },
    privateKey: { alias: 'p', requiresArg: true, type: 'string' },
  }).argv as Args

  let addresses: string[]

  if (argv.fetchAnonSet || !existsSync('addresses.json')) {
    console.log('Fetching addresses from query API')

    addresses = await fetchErc20AnonSet({
      min: argv.minBalance,
      tokenAddress: argv.erc20Address,
    })
    await writeFile('addresses.json', JSON.stringify(addresses))
  } else {
    console.log('Loading addresses from file')
    addresses = JSON.parse(await readFile('addresses.json', 'utf-8'))
  }

  await delay(300)
  console.log(addresses.slice(0, 10))

  await fetchProof({
    addresses,
    privateKey: argv?.privateKey,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
