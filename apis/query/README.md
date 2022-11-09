# Query API

| Method | Route                                           | Response   | Description                                                                |
|--------|-------------------------------------------------|------------|----------------------------------------------------------------------------|
| GET    | `/anonymity-set/balance/ETH?min`                | `string[]` | List of addresses that have at least `min` balance of ETH                  |
| GET    | `/anonymity-set/balance/ERC20?min&tokenAddress` | `string[]` | List of addresses that have at least `min` balance of a given ERC20        |
| GET    | `/anonymity-set/beacon`                         | `string[]` | List of addresses that deposited into the Beacon Chain Deposit Contract    |
| GET    | `/anonymity-set/ens-proposal-voters`            | `string[]` | List of addresses that deposited voted for or against a given ENS proposal |


## Getting Started - Develop
1. Authenticate BigQuery API Requests  
   1. [Set up a service account and create credentials](https://codelabs.developers.google.com/codelabs/cloud-bigquery-nodejs#3). Export credentials in an **`.keys.json`** file (docker secret). 
   2. Define environment variables: `echo "GOOGLE_CLOUD_PROJECT=your-project-id\nGOOGLE_CLOUD_CREDENTIALS=./.keys.json" > .env`
2. Authenticate Dune Analytics requests
   1. Define your username as environment variable: `echo "DUNE_USER=yourusername" >> .env` 
   2. Add your dune password in a **`.dune_pwd`** file (docker secret): `echo yourdunepwd > .dune_pwd`
3. Source `.env` file: `source .env`
4. Start  
  You can either use the node/npm scripts or docker compose
    - node
      ```commandline
      npm i -g pnpm nps
      pnpm i
      nps start.dev
      ``` 
    - docker: `docker compose up`

## The Graph
In case new queries are added or existing ones are updated, re create the artifacts with:
```commandline
pnpm exec graphclient build
```