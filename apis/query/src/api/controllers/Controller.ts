import { Get, JsonController, QueryParam } from 'routing-controllers'
import { Service } from 'typedi'

import { QueryService } from '@services'
import { VoteChoice } from '../../../.graphclient'

@Service()
@JsonController()
export class Controller {
  constructor(readonly service: QueryService) {}

  @Get('/anonymity-set/balance/ETH')
  async getEthBalanceAnonSet(@QueryParam('min') balance: string) {
    return this.service.getEthBalanceAnonSet(balance)
  }

  @Get('/anonymity-set/balance/ERC20')
  async getErc20BalanceAnonSet(
    @QueryParam('min') balance: string,
    @QueryParam('tokenAddress') tokenAddress: string,
  ) {
    return this.service.getErc20BalanceAnonSet({
      balance,
      tokenAddress: tokenAddress?.toLowerCase(),
    })
  }

  @Get('/anonymity-set/beacon')
  async getBeaconDepositors() {
    return this.service.getBeaconDepositors()
  }

  @Get('/anonymity-set/ens-proposal-voters')
  async getEnsProposalVoters(
    @QueryParam('id', { required: true }) id: string,
    @QueryParam('choice', { required: false }) choice: VoteChoice,
  ) {
    return this.service.getEnsGovVoters(id, choice)
  }

  @Get('/anonymity-set/punks')
  async getPunkOwners() {
    return this.service.getPunkOwners()
  }
}
