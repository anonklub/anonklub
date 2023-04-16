import { join } from 'path'
import { prompt } from './prompt'

const excludeRegex =
  /(coverage|dist|Library|node_modules|lerna|package|tsconfig|\/\.\w+)/

const askFile = (fileName: string) =>
  prompt<string>({
    depthLimit: 6,
    excludeFilter: (path: string) => !path.endsWith('.json'),
    excludePath: (path: string) => excludeRegex.test(path),
    itemType: 'file',
    message: `What is the path to your ${fileName} .json file?`,
    name: 'file',
    rootPath: join(__dirname, '..', '..', '..', '..'),
    // @ts-expect-error
    type: 'fuzzypath',
  })

export const askAddressesFile = askFile('addresses.')
export const askProofFile = askFile('proof')
export const askPublicSignalsFile = askFile('public signals')
export const askVerificationKeyFile = askFile('verification key')
