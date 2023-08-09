import { prompt } from './prompt'

export enum ProofAction {
  PROVE = 'prove',
  VERIFY = 'verify',
}

export const askProveOrVerify = prompt<ProofAction>({
  choices: [
    {
      name: 'Prove',
      value: ProofAction.PROVE,
    },
    {
      name: 'Verify',
      value: ProofAction.VERIFY,
    },
  ],
  message: 'Hey anon, what would you like to do?',
  name: 'action',
  type: 'list',
})
