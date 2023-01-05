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

  public async queryErc20Balance({
    min,
    tokenAddress,
  }: {
    min: number
    tokenAddress: string
  }) {
    return this.dune.query(Query.Erc20, [
      { key: 'tokenAddress', type: ParameterType.Text, value: tokenAddress },
      { key: 'min', type: ParameterType.Number, value: min },
    ])
  }
}
