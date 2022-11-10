import { Get, JsonController, QueryParam } from 'routing-controllers'
import { Service } from 'typedi'

import { QueryService } from '@services'
import { VoteChoice } from '../../../.graphclient'

@Service()
@JsonController()
export class Controller {
  constructor(readonly service: QueryService) {}

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

  @Get('/anonymity-set/beacon')
  async beaconDepositorsAnonymitySet() {
    return this.service.getBeaconDepositorsAnonymitySet()
  }

  @Get('/anonymity-set/ens-proposal-voters')
  async ensProposalVotersAnonymitySet(
    @QueryParam('id', { required: true }) id: string,
    @QueryParam('choice', { required: false }) choice: VoteChoice,
  ) {
    return this.service.getEnsGovVotersAnonymitySet(id, choice)
  }
}
