![anonklub banner](https://raw.githubusercontent.com/anonklub/assets/main/img/anonklub-banner-2.jpg)

<p align="center">
<a href="https://github.com/anonklub/anonklub/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/anonklub/anonklub">
    </a>
<br>
 <a href="https://github.com/anonklub/anonklub/actions?query=workflow%3Atest">
        <img alt="GitHub Workflow test" src="https://img.shields.io/github/actions/workflow/status/anonklub/anonklub/test.yml?branch=main&label=test&logo=github">
    </a>
 <a href="https://github.com/anonklub/anonklub/actions/workflows/static-analysis.yml">
        <img alt="GitHub Workflow static analysis" src="https://img.shields.io/github/actions/workflow/status/anonklub/anonklub/static-analysis.yml?logo=github&label=static%20analysis">
    </a>
  <a href="https://coveralls.io/github/anonklub/anonklub?branch=main">
  <img alt="Coveralls Badge" src="https://img.shields.io/coverallsCoverage/github/anonklub/anonklub.svg?label=coverage%20(ts)&logo=coveralls">
</a>
<br>
 <a href="https://www.npmjs.com/package/@anonklub/cli">
<img alt="@anonklub/cli npm badge" src="https://img.shields.io/npm/v/%40anonklub/cli?logo=npm&label=%40anonklub%2Fcli">
</a>
<a href="https://www.npmjs.com/package/@anonklub/proof">
<img alt="@anonklub/proof npm badge" src="https://img.shields.io/npm/v/%40anonklub/proof?logo=npm&label=%40anonklub%2Fproof">
</a>
<a href="https://www.npmjs.com/package/@anonklub/query">
<img alt="@anonklub/query npm badge" src="https://img.shields.io/npm/v/%40anonklub/query?logo=npm&label=%40anonklub%2Fquery">
</a>
<br>
<a href="https://github.com/anonklub/anonklub/deployments/query-api-staging">
<img alt="Discord" src="https://img.shields.io/github/deployments/anonklub/anonklub/query-api-staging?label=Query%20API%20Staging">
</a>
<a href="https://github.com/anonklub/anonklub/deployments/query-api-prod">
<img alt="Discord" src="https://img.shields.io/github/deployments/anonklub/anonklub/query-api-prod?label=Query%20API%20Prod">
</a>
<a href="https://github.com/anonklub/anonklub/deployments/discord-bot-staging">
<img alt="Discord" src="https://img.shields.io/github/deployments/anonklub/anonklub/discord-bot-staging?label=Discord%20Bot%20Staging">
</a>
<a href="https://github.com/anonklub/anonklub/deployments/discord-bot-prod">
<img alt="Discord" src="https://img.shields.io/github/deployments/anonklub/anonklub/discord-bot-prod?label=Discord%20Bot%20Prod">
</a>
<a href="https://github.com/anonklub/anonklub/deployments/ui-staging">
<img alt="Discord" src="https://img.shields.io/github/deployments/anonklub/anonklub/ui-staging?label=UI%20Staging">
</a>
<a href="https://github.com/anonklub/anonklub/deployments/ui-prod">
<img alt="Discord" src="https://img.shields.io/github/deployments/anonklub/anonklub/ui-prod?label=UI%20Prod">
</a>
</p>

| Content                                            | Description                                                                                                                                                |                Status                | Live Version                                                                                                                                                                                               |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [apis/query](apis/query)                           | Query API server                                                                                                                                           |          :heavy_check_mark:          | [https://anonset.fly.dev/](https://anonset.fly.dev/)                                                                                                                                                       |
| [apis/prove ](apis/prove)                          | Proving API server                                                                                                                                         |                 :x:                  | [https://anonklub.xyz](https://anonklub.xyz)                                                                                                                                                               |
| [circuits/circom](circuits/circom)                 | Circom circuits                                                                                                                                            |          :heavy_check_mark:          |                                                                                                                                                                                                            |
| [circuits/halo2](circuits/halo2)                   | Halo2 circuits                                                                                                                                             | :hourglass_flowing_sand: IN PROGRESS |                                                                                                                                                                                                            |
| [contracts](contracts)                             | Solidity contracts                                                                                                                                         |          :heavy_check_mark:          | [Groth16Verifier](https://sepolia.etherscan.io/address/0x893f293e3918a179bf87fb772206e9927db61b0c#code) [AnonMinter](https://sepolia.etherscan.io/address/0xcc639e338f9fb382d76f30928559cf14943600e0#code) |
| [discord-bot](discord-bot)                         | Discord Verification Bot                                                                                                                                   |                                      |                                                                                                                                                                                                            |
| [infra](infra)                                     | Infrastructure as Code with [pulumi](https://www.pulumi.com/)                                                                                              | :hourglass_flowing_sand: IN PROGRESS |                                                                                                                                                                                                            |
| [queries/crypto_ethereum](queries/crypto_ethereum) | Google [`bigquery-public-data.crypto_ethereum`](https://console.cloud.google.com/marketplace/product/ethereum/crypto-ethereum-blockchain) queries examples |          :heavy_check_mark:          |                                                                                                                                                                                                            |
| [queries/dune_analytics](queries/dune_analytics)   | [Dune Analytics](https://dune.com/) queries examples                                                                                                       |          :heavy_check_mark:          |                                                                                                                                                                                                            |
| [queries/the_graph](queries/the_graph)             | [The Graph](https://thegraph.com/en/) queries examples                                                                                                     |          :heavy_check_mark:          |                                                                                                                                                                                                            |
| ui                                                 | User Interface (fetch anonymity sets, generate or verify membership proofs)                                                                                |          :heavy_check_mark:          | https://anonklub.fly.dev/                                                                                                                                                                                  |

## Environment

Environment variables you may need: see [`.env.example`](.env.example)

## [Contribute](https://github.com/anonklub/anonklub/contribute)
