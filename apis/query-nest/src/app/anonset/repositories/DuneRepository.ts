import { Injectable } from '@nestjs/common'
import { DuneClient, DuneQuery } from './dune-client'
import { GetErc20BalanceOwnersDto } from '../dto'

@Injectable()
export class DuneRepository {
  constructor(private readonly dune: DuneClient) {}

  private async getAnonSet<T = Record<string, unknown>>(
    queryId: DuneQuery,
    params?: T,
  ) {
    return await this.dune.query<['address'], T>(queryId, params)
  }

  public async getErc20BalanceOwners(params: GetErc20BalanceOwnersDto) {
    return this.getAnonSet<GetErc20BalanceOwnersDto>(DuneQuery.Erc20, params)
  }

  public async getBeaconDepositors() {
    return this.getAnonSet(DuneQuery.Beacon)
  }

  public async getNftOwners(tokenAddress: string) {
    return this.getAnonSet(DuneQuery.Nft, { tokenAddress })
  }
}
