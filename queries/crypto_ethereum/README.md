# Google [`bigquery-public-data.crypto_ethereum`](https://console.cloud.google.com/marketplace/product/ethereum/crypto-ethereum-blockchain) queries examples


## Getting Started
Configure your connection (Google service account, Google user account, access/refresh tokens...).  
For instance with a JetBrains IDE, see [docs](https://www.jetbrains.com/help/idea/connect-to-bigquery.html).

## Queries
| File                                 | Description                                                                                         |
|--------------------------------------|-----------------------------------------------------------------------------------------------------|
| [beacon.sql](./beacon.sql)           | Get the latest list of addresses who deposited in the Beacon Deposit Contract                       |
| [eth_balance.sql](./eth_balance.sql) | Get the latest list of addresses who have a balance of at least 1 ETH                               |
| [tornado.sql](./tornado.sql)         | Get the latest list of addresses who deposited into or withdrew from a Tornado Cash Mixing Contract |
