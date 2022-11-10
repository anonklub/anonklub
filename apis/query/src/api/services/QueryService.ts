import { Service } from 'typedi'

import { Logger, LoggerInterface } from '@decorators/Logger'
import { CryptoEthereumRepository } from '@repositories'
import { spawn } from 'child_process'
import { getPunkOwners, getVotersPerProposal } from '~/graph'

enum ParameterType {
  Enum = 'enum',
  Text = 'text',
  Number = 'number',
  Date = 'date',
}

@Service()
export class QueryService {

  constructor(
    public repository: CryptoEthereumRepository,
    @Logger() readonly logger: LoggerInterface,
  ) {}

  private async python(
    scriptPath: string,
    ...rest: string[]
  ) {
    return new Promise<string[]>((resolve, reject) => {
      const python = spawn(process.env.PYTHON ?? 'python3', [
        scriptPath,
        ...rest,
      ])

      let result = ''

      python.stdout.on('data', (data) => {
        result += data.toString() as string
      })

      python.stdout.on('end', () => {
        resolve(JSON.parse(result))
      })

      python.stderr.on('data', (err) => {
        reject(err.toString())
      })
    })
  }

  private async queryDune(
    queryId: string,
    parameters?: Array<{
      name: string
      type: ParameterType
      value: string | number
    }>,
  ) {
    return parameters !== undefined
      ? this.python(
          'src/api/services/query.py',
          queryId,
          JSON.stringify(parameters),
        )
      : this.python('src/api/services/query.py', queryId)
  }

  async getEthBalanceAnonymitySet(balance: string) {
    return this.repository.queryEthBalance(balance).then((addresses) => {
      this.logger.info('Get ETH-balance based anonymity set')
      return addresses
    })
  }

  async getTokenBalanceAnonymitySet({
    balance,
    tokenAddress,
  }: {
    balance: string
    tokenAddress: string
  }) {
    return this.queryDune('1500107', [
      { name: 'min', type: ParameterType.Number, value: Number(balance) },
      {
        name: 'tokenAddress',
        type: ParameterType.Text,
        value: `'${tokenAddress}'`,
      },
    ]).then((result) => {
      this.logger.info('Get ERC20-balance based anonymity set')
      return result
    })
  }

  async getBeaconDepositorsAnonymitySet() {
    return this.queryDune('1499468').then((result) => {
      this.logger.info('Get Beacon Contract Depositors anonymity set')
      return result
    })
  }

  async getEnsGovVotersAnonymitySet(
    ...args: Parameters<typeof getVotersPerProposal>
  ) {
    return getVotersPerProposal(...args)
  }

  async getPunkOwnersAnonymitySet() {
    return getPunkOwners()
  }
}
