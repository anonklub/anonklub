import { Injectable } from '@nestjs/common'
import {
  GetEnsProposalVotersDto,
  GetErc20BalanceOwnersDto,
  GetEthBalanceOwnersDto,
  GetNftOwnersDto,
} from './dto'

@Injectable()
export class AnonsetService {
  async getEthBalanceOwners({ min = 10 }: GetEthBalanceOwnersDto) {
    console.log(min)
    return Promise.resolve('ethBalanceAnonset')
  }

  async getErc20BalanceOwners({
    min = '0',
    tokenAddress,
  }: GetErc20BalanceOwnersDto) {
    console.log(min, tokenAddress)
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
