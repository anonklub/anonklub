import { DuneClient as Dune, QueryParameter } from '@cowprotocol/ts-dune-client'
import { Service } from 'typedi'

export enum Query {
  Beacon = 2461144,
  Erc20 = 1500107,
}

@Service()
export class DuneRepository {
  dune: Dune
  constructor() {
    const { DUNE_API_KEY } = process.env
    if (DUNE_API_KEY === undefined) throw new Error('missing dune api key')
    this.dune = new Dune(DUNE_API_KEY)
  }

  public async queryErc20Balance({
    min,
    tokenAddress,
  }: {
    min: string
    tokenAddress: string
  }) {
    const parameters = [
      QueryParameter.number('min', min),
      QueryParameter.text('tokenAddress', `"${tokenAddress}"`),
    ]

    return this.dune.refresh(Query.Erc20, parameters)
  }

  public async queryBeaconDepositors() {
    return this.dune.refresh(Query.Beacon)
  }
}
