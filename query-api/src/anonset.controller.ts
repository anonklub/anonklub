import { CacheInterceptor } from '@nestjs/cache-manager'
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AnonsetService } from './anonset.service'
import { AnonsetResponse } from './decorators/AnonsetResponse'
import {
  GetEnsProposalVotersDto,
  GetErc20BalanceOwnersDto,
  GetEthBalanceOwnersDto,
  GetNftOwnersDto,
} from './dto'

@Controller()
@UseInterceptors(CacheInterceptor)
export class AnonsetController {
  constructor(private readonly service: AnonsetService) {}

  @ApiTags('Asset')
  @AnonsetResponse()
  @ApiOperation({
    summary: 'Get ethereum addresses that have a minimum balance of ETH.',
  })
  @Get('/asset/ETH')
  async getEthBalanceOwners(@Query() dto: GetEthBalanceOwnersDto) {
    return this.service.getEthBalanceOwners(dto)
  }

  @ApiTags('Asset')
  @AnonsetResponse()
  @ApiOperation({
    summary:
      'Get ethereum addresses that have a minimum balance of some ERC20.',
  })
  @Get('/asset/ERC20')
  async getErc20BalanceOwners(@Query() dto: GetErc20BalanceOwnersDto) {
    return this.service.getErc20BalanceOwners(dto)
  }

  @ApiTags('Asset')
  @AnonsetResponse()
  @ApiOperation({
    summary:
      'Get ethereum addresses that own an NFT of a given collection (other than cryptopunk).',
  })
  @Get('/asset/nft')
  async getNftOwners(@Query() dto: GetNftOwnersDto) {
    return this.service.getNftOwners(dto)
  }

  @ApiTags('Asset')
  @AnonsetResponse()
  @ApiOperation({
    summary: 'Get ethereum addresses that own a cryptopunk.',
  })
  @Get('/asset/cryptopunk')
  async getCryptopunkOwners() {
    return this.service.getCryptopunkOwners()
  }

  @ApiTags('Beacon')
  @AnonsetResponse()
  @ApiOperation({
    summary:
      'Get ethereum addresses that have deposited to the beacon contract (0x00000000219ab540356cbb839cbe05303d7705fa).',
  })
  @Get('/beacon')
  async getBeaconDepositors() {
    return this.service.getBeaconDepositors()
  }

  @ApiTags('DAO')
  @AnonsetResponse()
  @ApiOperation({
    summary: 'Get ethereum addresses that have voted on a given ENS proposal.',
  })
  @Get('/dao/ens')
  async getEnsProposalVoters(@Query() dto: GetEnsProposalVotersDto) {
    return this.service.getEnsProposalVoters(dto)
  }
}
