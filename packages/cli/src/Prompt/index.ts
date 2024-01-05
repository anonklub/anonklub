import {
  EnsProposalVotersRequest,
  Erc20BalanceAnonSetRequest,
  EthBalanceAnonSetRequest,
  Request,
} from '@anonklub/query'
import { ethers } from 'ethers'
import inquirer, { DistinctQuestion, QuestionCollection } from 'inquirer'
import { join } from 'path'
import { AnonSetLocation, AnonSetType, ProofAction } from '../types.js'
import { PromptI } from './interface'

const excludeRegex =
  /(coverage|dist|Library|node_modules|turbo|package|tsconfig|\/\.\w+)/

export class Prompt implements PromptI {
  askFile = (fileName: string) =>
    this.prompt<string>({
      depthLimit: 6,
      excludeFilter: (path: string) => !path.endsWith('.json'),
      excludePath: (path: string) => excludeRegex.test(path),
      itemType: 'file',
      message: `What is the path to your ${fileName} .json file?`,
      name: 'file',
      // TODO: fix fuzzy search
      rootPath: join(process.env['HOME'] as string),
      // @ts-expect-error ???
      type: 'fuzzypath',
    })

  prompt =
    <T>(questions: QuestionCollection | DistinctQuestion) =>
    async (): Promise<T> => {
      if (questions instanceof Array)
        return (await inquirer.prompt(questions as QuestionCollection)) as T

      const { name } = questions as DistinctQuestion
      if (name === undefined) throw new Error('Question must have a name')
      const { [name]: answer } = await inquirer.prompt(questions)
      return answer
    }

  askAddressesFile = this.askFile('addresses')

  askProofFile = this.askFile('proof')

  askPublicSignalsFile = this.askFile('public signals')

  askVerificationKeyFile = this.askFile('verification key')
  askProveOrVerify = this.prompt<ProofAction>({
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

  askAnonSetLocation = this.prompt<AnonSetLocation>({
    choices: [
      {
        name: 'On chain: query the ethereum blockchain as of latest block for me',
        value: AnonSetLocation.ONCHAIN,
      },
      {
        name: 'Locally: I have a json file with the list of addresses',
        value: AnonSetLocation.FILE,
      },
    ],

    message: 'Where does your anon set (list of addresses) lives?',
    name: 'anonSetLocation',
    type: 'list',
  })

  askAnonSetType = this.prompt<AnonSetType>({
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

  askErc20AnonSetInputs = this.prompt<Erc20BalanceAnonSetRequest>([
    {
      default: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
      message: 'ERC20 address you want to query',
      name: 'tokenAddress',
      type: 'string',
      validate: (answer: string) =>
        ethers.utils.isAddress(answer) || 'Invalid address',
    },
    {
      default: '1000',
      message:
        'Minimum balance of ERC20 one must own to be part of the anonymity set',
      name: 'min',
      type: 'string',
      validate: (answer: string) =>
        answer.match(/^[0-9]+$/)?.length !== undefined || 'Invalid number',
    },
  ])

  askEthAnonSetInput = this.prompt<Request<EthBalanceAnonSetRequest>>({
    message:
      'What is the integer minimum balance (in ETH) addresses should hold?',
    name: 'minBalance',
    type: 'input',
    validate: (answer: string) =>
      answer.match(/^[0-9]+$/) !== null || 'Invalid integer',
  })

  askEnsAnonSetInputs = this.prompt<Request<EnsProposalVotersRequest>>([
    {
      default: '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
      message: 'ERC20 address you want to query',
      name: 'tokenAddress',
      type: 'string',
      validate: (answer: string) =>
        ethers.utils.isAddress(answer) || 'Invalid address',
    },
    {
      default: '1000',
      message:
        'Minimum balance of ERC20 one must own to be part of the anonymity set',
      name: 'min',
      type: 'string',
      validate: (answer: string) =>
        answer.match(/^[0-9]+$/)?.length !== undefined || 'Invalid number',
    },
  ])

  askMessage = this.prompt<string>({
    default: 'Hello PSE',
    message: 'Message you will sign',
    name: 'message',
    validate: (answer: string) => answer.length !== 0 || 'Invalid message',
  })

  askRawSignature = async (message: string) =>
    this.prompt<string>({
      message: `Raw signature (0x-prefixed) of the message "${message}" signed by the private key of the address you want to prove is part of the list of addresses`,
      name: 'rawSignature',
      validate: (answer: string) =>
        answer.match(/^0x[0-9a-fA-F]{130}$/)?.length !== undefined ||
        'Invalid raw signature format',
    })()
}
