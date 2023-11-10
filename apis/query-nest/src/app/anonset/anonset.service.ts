import { Injectable } from '@nestjs/common'
import { parseEther } from 'viem'

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

  async getEthBalanceOwners({ min = '10' }: GetEthBalanceOwnersDto) {
    return this.bigqueryRepository
      .queryEthBalance(parseEther(min).toString())
      .then((addresses) => {
        return addresses
      })
  }

  async getErc20BalanceOwners({
    min = '0',
    tokenAddress,
  }: GetErc20BalanceOwnersDto) {
    return this.duneRepository
      .getErc20BalanceOwners({ min, tokenAddress })
      .then(({ result }) => {
        return result.rows.map((row) => row.address) ?? []
      })
  }

  async getBeaconDepositors() {
    return this.duneRepository.getBeaconDepositors().then(({ result }) => {
      return result.rows.map((row) => row.address) ?? []
    })
  }

  async getEnsProposalVoters(dto: GetEnsProposalVotersDto) {
    return this.graphRepository.getEnsProposalVoters(dto)
  }

  async getCryptopunkOwners() {
    return this.graphRepository.getCryptopunkOwners()
  }

  async getNftOwners({ tokenAddress }: GetNftOwnersDto) {
    return this.duneRepository.getNftOwners(tokenAddress).then(({ result }) => {
      return result.rows.map((row) => row.address) ?? []
    })
  }
}
