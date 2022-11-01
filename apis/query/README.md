# Query API

| Method | Route                                  | Response   | Description                                               |
|--------|----------------------------------------|------------|-----------------------------------------------------------|
| GET    | `/anonymity-set/balance?asset&balance` | `string[]` | List of addresses that have at least `balance` of `asset` |


## Getting Started
1. To authenticate BigQuery API Requests, you need to [set up a service account and create credentials](https://codelabs.developers.google.com/codelabs/cloud-bigquery-nodejs#3) (e.g. exported as `keys.json`).
2. Start
    - node
      ```commandline
      npm i -g pnpm nps
      pnpm i
      nps start
      ``` 
    - docker
      1. Build image
         ```commandline
         docker build -t r1oga:zk-ecdsa-query-api .
         ```
      2. Run container
         ```commandline
         docker run -p 3000:3000 -e "GOOGLE_CLOUD_PROJECT=ethereum-analytics-366016" -e "GOOGLE_APPLICATION_CREDENTIALS=./.key.json" r1oga:zk-ecdsa-query-api 
         ```