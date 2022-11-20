import { Get, JsonController, QueryParam, QueryParams } from 'routing-controllers-extended'
import { Service } from 'typedi'
import { QueryService } from '@services'

import { getEnsProposalVotersQuery } from './requests/EnsProposalVote'

@Service()
@JsonController('/anonymity-set')
export class AnonymitySet {
  constructor(readonly service: QueryService) {}

  @Get('/balance/ETH')
  async getEthBalanceAnonSet(@QueryParam('min') min: string) {
    return this.service.getEthBalanceAnonSet(min)
  }

  @Get('/balance/ERC20')
  async getErc20BalanceAnonSet(
    @QueryParam('min') min: string,
    @QueryParam('tokenAddress', {required: true}) tokenAddress: string,
  ) {
    return this.service.getErc20BalanceAnonSet({
      min,
      tokenAddress: tokenAddress?.toLowerCase(),
    })
  }

  @Get('/beacon')
  async getBeaconDepositors() {
    return this.service.getBeaconDepositors()
  }

  @Get('/ens-proposal-voters')
  async getEnsProposalVoters(
    @QueryParams() query: getEnsProposalVotersQuery
  ) {
    return this.service.getEnsProposalVoters(query)
  }

  @Get('/punks')
  async getPunkOwners() {
    return this.service.getPunkOwners()
  }
}
