import { Injectable, Logger } from '@nestjs/common'
import { parseEther } from 'viem'
import { HandleDuneCreditsError } from './decorators/handle-dune-credits-error'
import {
  GetEnsProposalVotersDto,
  GetErc20BalanceOwnersDto,
  GetEthBalanceOwnersDto,
  GetNftOwnersDto,
} from './dto'
import {
  BigQueryRepository,
  DuneRepository,
  GraphRepository,
} from './repositories'

@Injectable()
export class AnonsetService {
  private readonly logger = new Logger(AnonsetService.name)

  constructor(
    private readonly bigqueryRepository: BigQueryRepository,
    private readonly duneRepository: DuneRepository,
    private readonly graphRepository: GraphRepository,
  ) {}

  async getEthBalanceOwners({ min = '10' }: GetEthBalanceOwnersDto) {
    this.logger.log(`getEthBalanceOwners: >=${min} ETH`)
    return this.bigqueryRepository
      .queryEthBalance(parseEther(min).toString())
      .then((addresses) => {
        return addresses
      })
  }

  @HandleDuneCreditsError()
  async getErc20BalanceOwners({
    min = '0',
    tokenAddress,
  }: GetErc20BalanceOwnersDto) {
    this.logger.log(`getErc20BalanceOwners: ${tokenAddress} >= ${min}`)
    return this.duneRepository
      .getErc20BalanceOwners({ min, tokenAddress })
      .then(({ result }) => {
        return result.rows.map((row) => row.address) ?? []
      })
  }

  @HandleDuneCreditsError()
  async getBeaconDepositors() {
    this.logger.log(`getBeaconDepositors`)
    return this.duneRepository.getBeaconDepositors().then(({ result }) => {
      return result.rows.map((row) => row.address) ?? []
    })
  }

  async getEnsProposalVoters(dto: GetEnsProposalVotersDto) {
    this.logger.log(`getEnsProposalVoters: ${dto.choice} ${dto.id}`)
    return this.graphRepository.getEnsProposalVoters(dto)
  }

  async getCryptopunkOwners() {
    this.logger.log(`getCryptopunkOwners`)
    return this.graphRepository.getCryptopunkOwners()
  }

  @HandleDuneCreditsError()
  async getNftOwners({ tokenAddress }: GetNftOwnersDto) {
    this.logger.log(`getNftOwners: ${tokenAddress}`)
    return this.duneRepository.getNftOwners(tokenAddress).then(({ result }) => {
      return result.rows.map((row) => row.address) ?? []
    })
  }
}
