import { Service } from 'typedi'

import { Logger, LoggerInterface } from '@decorators/Logger'
import {
  BigQueryRepository,
  DuneRepository,
  GraphRepository,
  ParameterType,
  Query,
} from '@repositories'

@Service()
export class QueryService {
  constructor(
    readonly bigQueryRepository: BigQueryRepository,
    readonly duneRepository: DuneRepository,
    readonly graphRepository: GraphRepository,
    @Logger() readonly logger: LoggerInterface,
  ) {}

  async getEthBalanceAnonSet(balance: string) {
    return this.bigQueryRepository
      .queryEthBalance(balance)
      .then((addresses) => {
        this.logger.info('Get ETH-balance based anonymity set')
        return addresses
      })
  }

  async getErc20BalanceAnonSet({
    balance,
    tokenAddress,
  }: {
    balance: string
    tokenAddress: string
  }) {
    return this.duneRepository
      .executeDuneQuery(Query.Erc20, [
        { name: 'min', type: ParameterType.Number, value: Number(balance) },
        {
          name: 'tokenAddress',
          type: ParameterType.Text,
          value: `'${tokenAddress}'`,
        },
      ])
      .then((result) => {
        this.logger.info('Get ERC20-balance based anonymity set')
        return result
      })
  }

  async getBeaconDepositors() {
    return this.duneRepository.executeDuneQuery(Query.Beacon).then((result) => {
      this.logger.info('Get Beacon Contract Depositors anonymity set')
      return result
    })
  }

  async getEnsGovVoters(
    ...args: Parameters<typeof this.graphRepository.getEnsGovVoters>
  ) {
    return this.graphRepository.getEnsGovVoters(...args)
  }

  async getPunkOwners() {
    return this.graphRepository.getPunkOwners()
  }
}
