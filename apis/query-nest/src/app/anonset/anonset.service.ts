import { Injectable } from '@nestjs/common'
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
  constructor(
    private readonly bigqueryRepository: BigQueryRepository,
    private readonly duneRepository: DuneRepository,
    private readonly graphRepository: GraphRepository,
  ) {}

  async getEthBalanceOwners({ min = 10 }: GetEthBalanceOwnersDto) {
    console.log(min)
    return Promise.resolve('ethBalanceAnonset')
  }

  async getErc20BalanceOwners({
    min = '0',
    tokenAddress,
  }: GetErc20BalanceOwnersDto) {
    return Promise.resolve('erc20BalanceAnonSet')
  }

  async getBeaconDepositors() {
    return Promise.resolve('beaconDepositors')
  }

  async getEnsProposalVoters({ id, choice }: GetEnsProposalVotersDto) {
    return Promise.resolve('ensProposalVoters')
  }

  async getCryptopunkOwners() {
    return Promise.resolve('punkOwners')
  }

  async getNftOwners(tokenAddress: GetNftOwnersDto) {
    return Promise.resolve('nftOwners')
  }
}
