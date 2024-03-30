import inquirer, {
  type DistinctQuestion,
  type QuestionCollection,
} from 'inquirer'
import inquirerFuzzyPath from 'inquirer-fuzzy-path'
import { join } from 'node:path'

inquirer.registerPrompt('fuzzypath', inquirerFuzzyPath)

export const prompt =
  <T>(questions: QuestionCollection | DistinctQuestion) =>
  async (): Promise<T> => {
    if (Array.isArray(questions))
      return (await inquirer.prompt(questions as QuestionCollection)) as T

    const { name } = questions as DistinctQuestion
    if (name === undefined) throw new Error('Question must have a name')
    const { [name]: answer } = await inquirer.prompt(questions)
    return answer
  }

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
export const askVerificationKeyFile = askFile('verification key')
