import delay from 'delay'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import { fetchProof } from './fetch-proof'
import { fetchErc20AnonSet } from './fetch-anon-set'
import { readFile, writeFile } from 'fs/promises'

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
  // const addresses = await fetchErc20AnonSet({
  //   min: argv.minBalance,
  //   tokenAddress: argv.erc20Address,
  // })
  //
  //
  // await writeFile('addresses.json', JSON.stringify(addresses))

  // loading addresses from file
  const addresses = JSON.parse(await readFile('addresses.json', 'utf-8'))

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
