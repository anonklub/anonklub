import { prompt } from './prompt'

export const askRawSignature = async (message: string) =>
  prompt<string>({
    message: `Raw signature (0x-prefixed) of the message "${message}" signed by the private key of the address you want to prove is part of the list of addresses`,
    name: 'rawSignature',
    validate: (answer: string) =>
      answer.match(/^0x[0-9a-fA-F]{130}$/)?.length !== undefined ||
      'Invalid raw signature format',
  })()
