import { Get, JsonController, QueryParam } from 'routing-controllers'
import { Service } from 'typedi'

import { QueryService } from '@services'
import { VoteChoice } from '~/graph'

@Service()
@JsonController()
export class Controller {
  constructor(readonly service: QueryService) {}

  @Get('/healthcheck')
  async healthcheck() {
    return 'OK'
  }

  @Get('/anonymity-set/balance/ETH')
  async getEthBalanceAnonSet(@QueryParam('min') min: string) {
    return this.service.getEthBalanceAnonSet(min)
  }

  @Get('/anonymity-set/balance/ERC20')
  async getErc20BalanceAnonSet(
    @QueryParam('min') min: string,
    @QueryParam('tokenAddress', { required: true }) tokenAddress: string,
  ) {
    return this.service.getErc20BalanceAnonSet({
      min,
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
    return this.service.getEnsProposalVoters({ id, choice })
  }

  @Get('/anonymity-set/punks')
  async getPunkOwners() {
    return this.service.getPunkOwners()
  }
}
