import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common'
import { AnonsetService } from './anonset.service'
import {
  GetEnsProposalVotersDto,
  GetErc20BalanceOwnersDto,
  GetEthBalanceOwnersDto,
  GetNftOwnersDto,
} from './dto'

@Controller()
export class AnonsetController {
  constructor(private readonly service: AnonsetService) {}

  @Get('/asset/ETH')
  async getEthBalanceOwners(@Query() dto: GetEthBalanceOwnersDto) {
    return this.service.getEthBalanceOwners(dto)
  }

  @Get('/asset/ERC20')
  async getErc20BalanceOwners(@Query() dto: GetErc20BalanceOwnersDto) {
    return this.service.getErc20BalanceOwners(dto)
  }

  @Get('/asset/nft')
  async getNftOwners(@Query() dto: GetNftOwnersDto) {
    return this.service.getNftOwners(dto)
  }

  @Get('/asset/cryptopunk')
  async getCryptopunkOwners() {
    return this.service.getCryptopunkOwners()
  }

  @Get('/beacon')
  async getBeaconDepositors() {
    return this.service.getBeaconDepositors()
  }

  @Get('/dao/ens')
  async getEnsProposalVoters(@Query() dto: GetEnsProposalVotersDto) {
    return this.service.getEnsProposalVoters(dto)
  }
}
