// TODO: move to shared pkg
import { join } from 'path'
import { prompt } from './prompt'

const excludeRegex =
  /(coverage|dist|Library|node_modules|turbo|package|tsconfig|\/\.\w+)/

const askFile = (fileName: string) => async () => {
  const path = await prompt<string>({
    depthLimit: 6,
    excludeFilter: (path: string) => !path.endsWith('.json'),
    excludePath: (path: string) => excludeRegex.test(path),
    itemType: 'file',
    message: `What is the path to your ${fileName} .json file?`,
    name: 'file',
    rootPath: join(__dirname, '..', '..'),
    // @ts-expect-error
    type: 'fuzzypath',
  })()

  return (await import(path)).default
}

export const askProofFile = askFile('proof')
export const askPublicSignalsFile = askFile('public signals')
