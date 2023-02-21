# Query API

[https://anon-set.fly.dev/](https://e2e-zkecdsa-query-api.fly.dev/)

| Method | Route                                           | Response   | Description                                                                |
| ------ | ----------------------------------------------- | ---------- | -------------------------------------------------------------------------- |
| GET    | `/anonymity-set/balance/ETH?min`                | `string[]` | List of addresses that have at least `min` balance of ETH                  |
| GET    | `/anonymity-set/balance/ERC20?min&tokenAddress` | `string[]` | List of addresses that have at least `min` balance of a given ERC20        |
| GET    | `/anonymity-set/beacon`                         | `string[]` | List of addresses that deposited into the Beacon Chain Deposit Contract    |
| GET    | `/anonymity-set/ens-proposal-voters`            | `string[]` | List of addresses that deposited voted for or against a given ENS proposal |
| GET    | `/anonymity-set/punks`                          | `string[]` | List of addresses that own a cryptopunk                                    |

## Getting Started - Develop

1. Authenticate requests

   | Data Provider  | Register/Get Credentials                                                                                                                                         | For node script                                                                                        | For docker compose                     |
   | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------- |
   | BigQuery       | [Define Google Service Account](https://codelabs.developers.google.com/codelabs/cloud-bigquery-nodejs#3) and export google credentials in a **`.key.json`** file | `echo "GOOGLE_CLOUD_PROJECT=your-project-id\GOOGLE_APPLICATION_CREDENTIALS='$(cat .key.json)'" > .env` |                                        |
   | Dune Analytics | [Create Dune Account](https://dune.com/)                                                                                                                         | `echo "DUNE_USER=yourusername" >> .env`                                                                | `echo "your_dune_pwd" > .dune_pwd`     |
   | The Graph      | [Subgraph Studio](https://thegraph.com/studio/apikeys/)                                                                                                          | `echo "GRAPH_API_KEY=yourapikey" >> .env`                                                              | `echo "your_api_key" > .graph_api_key` |

2. Source `.env` file: `source .env`
3. Start
   - node script
     ```commandline
     npm i -g pnpm nps
     pnpm i
     pn start.dev
     ```
   - docker: `docker compose -f docker-compose-dev.yaml up --build query-api`

## The Graph

In case new queries are added or existing ones are updated, re-create the artifacts with:

```commandline
pn graph
```

## Deploy

Install [`flyctl`](https://fly.io/docs/flyctl/installing/).

```commandline
fly deploy --dockerfile Dockerfile-deploy
```
