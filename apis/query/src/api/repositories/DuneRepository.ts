import { Service } from 'typedi'
import { getErc20BalanceAnonSetQuery } from '@controllers/requests'
import { DuneClient, Query } from '~/dune-client'

@Service()
export class DuneRepository {
  dune: DuneClient
  constructor() {
    this.dune = new DuneClient()
  }

  private async getAnonSet<T = Record<string, unknown>>(
    queryId: Query,
    params?: T,
  ) {
    return await this.dune.query<['address'], T>(queryId, params)
  }

  public async queryErc20Balance(params: getErc20BalanceAnonSetQuery) {
    return this.getAnonSet<getErc20BalanceAnonSetQuery>(Query.Erc20, params)
  }

  public async queryBeaconDepositors() {
    return this.getAnonSet(Query.Beacon)
  }
}
