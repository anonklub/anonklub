import { Get, JsonController, QueryParams } from 'routing-controllers-extended'
import { Service } from 'typedi'
import {
  getEnsProposalVotersQuery,
  getErc20BalanceAnonSetQuery,
  getEthBalanceAnonSetQuery,
} from '@controllers/requests'
import { QueryService } from '@services'

@Service()
@JsonController()
export class AnonymitySet {
  constructor(readonly service: QueryService) {}

  @Get('/balance/ETH')
  async getEthBalanceAnonSet(
    @QueryParams() { min }: getEthBalanceAnonSetQuery,
  ) {
    return this.service.getEthBalanceAnonSet(min)
  }

  @Get('/balance/ERC20')
  async getErc20BalanceAnonSet(
    @QueryParams() { min, tokenAddress }: getErc20BalanceAnonSetQuery,
  ) {
    return this.service.getErc20BalanceAnonSet({
      min: min ?? '0',
      tokenAddress: tokenAddress?.toLowerCase(),
    })
  }

  @Get('/beacon')
  async getBeaconDepositors() {
    return this.service.getBeaconDepositors()
  }

  @Get('/ens-proposal-voters')
  async getEnsProposalVoters(@QueryParams() query: getEnsProposalVotersQuery) {
    return this.service.getEnsProposalVoters(query)
  }

  @Get('/punks')
  async getPunkOwners() {
    return this.service.getPunkOwners()
  }
}
