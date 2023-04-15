import { prompt } from './prompt'

export const askMessage = prompt<string>({
  default: 'Hello PSE',
  message: 'Message that you signed',
  name: 'message',
  validate: (answer: string) => answer.length !== 0 || 'Invalid message',
})
