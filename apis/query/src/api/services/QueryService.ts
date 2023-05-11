import { utils } from 'ethers'
import { Service } from 'typedi'
import { getErc20BalanceAnonSetQuery } from '@controllers/requests'
import { Logger, LoggerInterface } from '@decorators/Logger'
import {
  BigQueryRepository,
  DuneRepository,
  GraphRepository,
} from '@repositories'

@Service()
export class QueryService {
  constructor(
    readonly bigQueryRepository: BigQueryRepository,
    readonly duneRepository: DuneRepository,
    readonly graphRepository: GraphRepository,
    @Logger() readonly logger: LoggerInterface,
  ) {}

  async getEthBalanceAnonSet(min: string) {
    return this.bigQueryRepository
      .queryEthBalance(utils.parseEther(min).toString())
      .then((addresses) => {
        this.logger.info('Get ETH-balance based anonymity set')
        return addresses
      })
  }

  async getErc20BalanceAnonSet({
    min = '0',
    tokenAddress,
  }: getErc20BalanceAnonSetQuery) {
    return this.duneRepository
      .queryErc20Balance({ min, tokenAddress })
      .then(({ result }) => {
        this.logger.info('Get ERC20-balance based anonymity set')
        return result?.rows?.map((row) => row.address) ?? []
      })
  }

  async getBeaconDepositors() {
    return this.duneRepository.queryBeaconDepositors().then(({ result }) => {
      this.logger.info('Get Beacon Contract Depositors anonymity set')
      return result?.rows?.map((row) => row.address) ?? []
    })
  }

  async getEnsProposalVoters(
    ...args: Parameters<typeof this.graphRepository.getEnsProposalVoters>
  ) {
    return this.graphRepository.getEnsProposalVoters(...args)
  }

  async getPunkOwners() {
    return this.graphRepository.getPunkOwners()
  }
}
