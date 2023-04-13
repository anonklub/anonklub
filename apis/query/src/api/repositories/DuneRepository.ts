import { Dune, ParameterType } from 'dune-ts'
import { Service } from 'typedi'

export enum Query {
  Erc20 = 1500107,
}

@Service()
export class DuneRepository {
  dune: Dune

  constructor() {
    this.dune = new Dune({
      password: process.env.DUNE_PASSWORD,
      username: process.env.DUNE_USERNAME,
    })
  }

  private resetDune() {
    console.log('reset dune')
    this.dune = new Dune({
      password: process.env.DUNE_PASSWORD,
      username: process.env.DUNE_USERNAME,
    })
  }

  private async _queryErc20Balance({
    min,
    tokenAddress,
  }: {
    min: string
    tokenAddress: string
  }) {
    return this.dune.query(Query.Erc20, [
      { key: 'tokenAddress', type: ParameterType.Text, value: tokenAddress },
      { key: 'min', type: ParameterType.Number, value: min },
    ])
  }

  public async queryErc20Balance({
    min,
    tokenAddress,
  }: {
    min: string
    tokenAddress: string
  }) {
    try {
      return await this._queryErc20Balance({ min, tokenAddress })
    } catch (err) {
      console.log({ executionId: this.dune.executionId })
      console.log('DuneRepository.queryErc20Balance() error:', err)
      // TODO: not sure if this is reliable fix, look into dune-ts instead (cache of cookies/bearer token?)
      this.resetDune()
      return this._queryErc20Balance({ min, tokenAddress })
    }
  }
}
