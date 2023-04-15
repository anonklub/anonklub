import { prompt } from './prompt'

export enum AnonSetType {
  ERC20_BALANCE = 'erc20_balance',
  ETH_BALANCE = 'eth_balance',
  CRYPTO_PUNK = 'crypto_punk',
  ENS = 'ens',
}

export const askAnonSetType = prompt<AnonSetType>({
  choices: [
    {
      name: 'Holders of a min ERC20 Balance',
      value: AnonSetType.ERC20_BALANCE,
    },
    {
      name: 'Holders of a min ETH Balance',
      value: AnonSetType.ETH_BALANCE,
    },
    {
      name: 'CryptoPunk owners',
      value: AnonSetType.CRYPTO_PUNK,
    },
    {
      name: 'Addresses that participated in a ENS Governance voting round',
      value: AnonSetType.ENS,
    },
  ],

  message: 'What type of anon set do you want to prove?',
  name: 'anonSetType',
  type: 'list',
})
