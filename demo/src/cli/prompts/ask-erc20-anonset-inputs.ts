import { ethers } from 'ethers'
import { prompt } from './prompt'

export const askErc20AnonsetInputs = prompt<{
  erc20Address: string
  minBalance: string
}>([
  {
    default: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
    message: 'ERC20 address you want to query',
    name: 'erc20Address',
    type: 'string',
    validate: (answer: string) =>
      ethers.utils.isAddress(answer) || 'Invalid address',
  },
  {
    default: '1000',
    message:
      'Minimum balance of ERC20 one must own to be part of the anonymity set',
    name: 'minBalance',
    type: 'string',
    validate: (answer: string) =>
      answer.match(/^[0-9]+$/)?.length !== undefined || 'Invalid number',
  },
])
