import inquirer, { DistinctQuestion, QuestionCollection } from 'inquirer'

export const prompt =
  <T>(questions: DistinctQuestion | QuestionCollection) =>
  async (): Promise<T> => {
    if (questions instanceof Array)
      return (await inquirer.prompt(questions as QuestionCollection)) as T

    const { name } = questions as DistinctQuestion
    if (name === undefined) throw new Error('Question must have a name')
    const { [name]: answer } = await inquirer.prompt(questions)
    return answer
  }
