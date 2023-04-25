import { Service } from 'typedi'
import { Db } from '~/bigquery'

@Service()
export class BigQueryRepository {
  constructor(public db: Db) {}

  async queryEthBalance(balance: string): Promise<string[]> {
    return this.db
      .query({
        params: { balance },
        query: `select distinct address
                         from \`bigquery-public-data.crypto_ethereum.balances\`
                         where eth_balance >= @balance;`,
        types: { balance: 'NUMERIC' },
      })
      .then((rows) => rows[0].map(({ address }) => address))
  }
}
