import { Injectable } from '@nestjs/common'
import { BigqueryClient } from './bigquery-client'

@Injectable()
export class BigQueryRepository {
	constructor(private readonly bigquery: BigqueryClient) {}

	async queryEthBalance(balance: string): Promise<string[]> {
		return this.bigquery
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
