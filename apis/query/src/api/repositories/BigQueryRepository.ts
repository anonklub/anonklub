import { Service } from 'typedi'

import { Db } from '../../db'

@Service()
export class BigQueryRepository {
  constructor(public db: Db) {}

  async queryEthBalance(balance: string) {
    return this.db
      .query({
        query: `select distinct address
                         from \`bigquery-public-data.crypto_ethereum.balances\`
                         where eth_balance >= @balance;`,
        params: { balance },
        types: { balance: 'NUMERIC' },
      })
      .then((rows) => rows[0].map(({ address }) => address))
  }
}
