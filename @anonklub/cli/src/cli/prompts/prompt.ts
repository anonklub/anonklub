import inquirer, { DistinctQuestion, QuestionCollection } from 'inquirer'
import inquirerFuzzyPath from 'inquirer-fuzzy-path'

inquirer.registerPrompt('fuzzypath', inquirerFuzzyPath)

export const prompt =
  <T>(questions: QuestionCollection | DistinctQuestion) =>
  async (): Promise<T> => {
    if (questions instanceof Array)
      return (await inquirer.prompt(questions as QuestionCollection)) as T

    const { name } = questions as DistinctQuestion
    if (name === undefined) throw new Error('Question must have a name')
    const { [name]: answer } = await inquirer.prompt(questions)
    return answer
  }
