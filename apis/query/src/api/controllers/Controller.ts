import { JsonController, Get, QueryParam } from 'routing-controllers'
import { Service } from 'typedi'

import { QueryService } from '@services'

@Service()
@JsonController()
export class Controller {
  constructor(private service: QueryService) {}

  @Get('/anonymity-set/balance/ETH')
  async ethBalanceAnonymitySet(@QueryParam('min') balance: string) {
    return this.service.getEthBalanceAnonymitySet(balance)
  }

  @Get('/anonymity-set/balance/ERC20')
  async erc20BalanceAnonymitySet(
    @QueryParam('min') balance: string,
    @QueryParam('tokenAddress') tokenAddress: string,
  ) {
    return this.service.getTokenBalanceAnonymitySet({
      balance,
      tokenAddress: tokenAddress?.toLowerCase(),
    })
  }
}
