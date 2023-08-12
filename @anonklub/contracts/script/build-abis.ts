import { copyFileSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const buildAbi = (contract: string) => {
  const contractPath = join(
    __dirname,
    '..',
    'out',
    `${contract}.sol`,
    `${contract}.json`,
  )
  const abiString = readFileSync(contractPath, 'utf8')
  const { abi } = JSON.parse(abiString)

  const abiPath = join(__dirname, '..', 'abis', `${contract}.ts`)
  const abiContent = `export const ${contract}Abi = ${JSON.stringify(
    abi,
    null,
    2,
  )} as const`

  writeFileSync(abiPath, abiContent)
  copyFileSync(contractPath, join(__dirname, '..', 'abis', `${contract}.json`))
}

const buildAbis = (contracts: string[]) => {
  contracts.forEach(buildAbi)
}

buildAbis(['Groth16Verifier', 'AnonMinter', 'Verifier'])
