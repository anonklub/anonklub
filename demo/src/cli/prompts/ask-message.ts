import { prompt } from './prompt'

export const askMessage = prompt<string>({
  default: 'Hello PSE',
  message: 'Message you will sign',
  name: 'message',
  validate: (answer: string) => answer.length !== 0 || 'Invalid message',
})
