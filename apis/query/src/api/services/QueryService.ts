import { Service } from 'typedi'

import { Logger, LoggerInterface } from '@decorators/Logger'
import { CryptoEthereumRepository } from '@repositories'
import { spawn } from 'child_process'

// FIXME
/* eslint-disable */
enum ParameterType {
  Enum = 'enum',
  Text = 'text',
  Number = 'number',
  Date = 'date',
}

/* eslint-disable */

@Service()
export class QueryService {
  // private python: ChildProcessWithoutNullStreams

  constructor(
    public repository: CryptoEthereumRepository,
    @Logger() private logger: LoggerInterface,
  ) {}

  private async python(
    scriptPath: string,
    ...rest: string[]
  ): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const python = spawn(process.env.PYTHON || 'python3', [
        scriptPath,
        ...rest,
      ])

      let result = ''

      python.stdout.on('data', (data) => {
        result += data.toString()
      })

      python.stdout.on('end', () => {
        resolve(JSON.parse(result))
      })

      python.stderr.on('data', (err) => {
        reject(err.toString())
      })
    })
  }

  private queryDune(
    queryId: string,
    parameters?: {
      name: string
      type: ParameterType
      value: string | number
    }[],
  ) {
    return parameters
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
}
