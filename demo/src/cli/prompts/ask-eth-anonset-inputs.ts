import { prompt } from './prompt'

export const askEthAnonsetInputs = prompt<{ minBalance: string }>({
  message:
    'What is the integer minimum balance (in ETH) addresses should hold?',
  name: 'minBalance',
  type: 'input',
  validate: (answer: string) =>
    answer.match(/^[0-9]+$/) !== null || 'Invalid integer',
})
