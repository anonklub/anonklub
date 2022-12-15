# [Dune Analytics](https://dune.com/) queries examples

## Getting started

1. Install dependencies (python 3.10): `pip -r requirements.txt`
2. Run queries (requires your dune analytics credentials)
   ```commandline
   USERNAME=username PASSWORD=password python main.py beacon|tornado|ens_balance`
   ```

## Queries

| File                                   | Description                                                                                         |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [beacon.sql](./beacon.sql)             | Get the latest list of addresses who deposited in the Beacon Deposit Contract                       |
| [erc20_balance.sql](./eth_balance.sql) | Get the latest list of addresses who have a balance of at least X ERC20 (example with `ENS`)        |
| [tornado.sql](./tornado.sql)           | Get the latest list of addresses who deposited into or withdrew from a Tornado Cash Mixing Contract |
