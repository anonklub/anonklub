import { Controller, Get } from '@nestjs/common'
import { AnonsetService } from './anonset.service'

@Controller()
export class AnonsetController {
  constructor(private readonly service: AnonsetService) {}

  @Get()
  getHello(): string {
    return this.service.getHello()
  }

  @Get('/asset/ETH')
  getEthBalanceAnonSet(): string {
    return this.service.getEthBalanceAnonSet()
  }

  @Get('/asset/ERC20')
  getErc20BalanceAnonSet(): string {
    return 'balance erc20'
  }

  @Get('/asset/nft')
  getNftOwnersAnonSet(): string {
    return 'nft owners'
  }

  @Get('/asset/cryptopunk')
  getCryptopunkOwnersAnonSet(): string {
    return 'cyrptopunk owners'
  }

  @Get('/beacon')
  getBeaconDepositors(): string {
    return 'beacon depositors'
  }

  @Get('/dao/ens')
  getEnsProposalVoters(): string {
    return 'ens proposal voters'
  }
}
