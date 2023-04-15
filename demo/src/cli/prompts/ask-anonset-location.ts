import { prompt } from './prompt'

export enum AnonSetLocation {
  ONCHAIN = 'onchain',
  FILE = 'file',
}

export const askAnonSetLocation = prompt<AnonSetLocation>({
  choices: [
    {
      name: 'On chain, query the ethereum blockchain as of latest block for me',
      value: AnonSetLocation.ONCHAIN,
    },
    {
      name: 'Locally, I have a file with the list of addresses',
      value: AnonSetLocation.FILE,
    },
  ],

  message: 'Where does your anon set (list of addresses) lives?',
  name: 'anonSetLocation',
  type: 'list',
})
