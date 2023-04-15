import { homedir } from 'os'
import { prompt } from './prompt'

const excludeRegex =
  /(coverage|dist|Library|node_modules|lerna|package|tsconfig|\/\.\w+)/

export const askFile = prompt<string>({
  depthLimit: 5,
  excludeFilter: (path: string) => !path.endsWith('.json'),
  excludePath: (path: string) => excludeRegex.test(path),
  itemType: 'file',
  message: 'What is the path to your file?',
  name: 'file',
  rootPath: homedir(),
  // @ts-expect-error
  type: 'fuzzypath',
})
