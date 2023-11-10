import { Injectable } from '@nestjs/common'
import { DuneClient, Query } from '~/dune-client'
import { GetErc20BalanceOwnersDto } from '../dto'

@Injectable()
export class DuneRepository {
  constructor(readonly dune: DuneClient) {}

  private async getAnonSet<T = Record<string, unknown>>(
    queryId: Query,
    params?: T,
  ) {
    return await this.dune.query<['address'], T>(queryId, params)
  }

  public async getErc20BalanceOwners(params: GetErc20BalanceOwnersDto) {
    return this.getAnonSet<GetErc20BalanceOwnersDto>(Query.Erc20, params)
  }

  public async getBeaconDepositors() {
    return this.getAnonSet(Query.Beacon)
  }

  public async getNftOwners(tokenAddress: string) {
    return this.getAnonSet(Query.Nft, { tokenAddress })
  }
}
