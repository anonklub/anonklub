import { prompt } from './prompt'

export enum Choice {
  For = 'FOR',
  Against = 'AGAINST',
  Abstain = 'ABSTAIN',
}

export const askEnsAnonsetInputs = prompt<{ choice: Choice; id: string }>([
  {
    message:
      'What is the ENS Proposal ID (can be found e.g on https://tally.xyz)?',
    name: 'id',
    type: 'input',
  },
  {
    choices: [Choice.For, Choice.Against, Choice.Abstain],
    message: 'Vote?',
    name: 'choice',
    type: 'list',
  },
])
