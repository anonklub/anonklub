![anonklub banner](https://raw.githubusercontent.com/anonklub/assets/main/img/anonklub-banner-2.jpg)

<p align="center">
<a href="https://github.com/anonklub/anonklub/blob/main/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/anonklub/anonklub">
    </a>
<br>
 <a href="https://github.com/anonklub/anonklub/actions?query=workflow%3Amain-staging">
        <img alt="GitHub Workflow test" src="https://img.shields.io/github/actions/workflow/status/anonklub/anonklub/main-staging.yml?style=flat-squarebranch=main&label=main&logo=github">
  </a>
  <a href="https://coveralls.io/github/anonklub/anonklub?branch=main">
  <img alt="Coveralls Badge" src="https://img.shields.io/coverallsCoverage/github/anonklub/anonklub.svg?label=coverage%20(ts)&logo=coveralls">
</a>
<br>
<a href="https://www.npmjs.com/package/@anonklub/proof">
<img alt="@anonklub/proof npm badge" src="https://img.shields.io/npm/v/%40anonklub/proof?logo=npm&label=%40anonklub%2Fproof">
</a>
<a href="https://www.npmjs.com/package/@anonklub/query">
<img alt="@anonklub/query npm badge" src="https://img.shields.io/npm/v/%40anonklub/query?logo=npm&label=%40anonklub%2Fquery">
</a>
<a href="https://www.npmjs.com/package/@anonklub/merkle-tree-wasm">
<img alt="@anonklub/merkle-tree-wasm npm badge" src="https://img.shields.io/npm/v/%40anonklub/merkle-tree-wasm?logo=npm&label=%40anonklub%2Fmerkle-tree-wasm">
</a>
<a href="https://www.npmjs.com/package/@anonklub/merkle-tree-worker">
<img alt="@anonklub/merkle-tree-worker npm badge" src="https://img.shields.io/npm/v/%40anonklub/merkle-tree-worker?logo=npm&label=%40anonklub%2Fmerkle-tree-worker">
</a>
<a href="https://www.npmjs.com/package/@anonklub/spartan-ecdsa-wasm">
<img alt="@anonklub/spartan-ecdsa-wasm npm badge" src="https://img.shields.io/npm/v/%40anonklub/spartan-ecdsa-wasm?logo=npm&label=%40anonklub%2Fspartan-ecdsa-wasm">
</a>
<a href="https://www.npmjs.com/package/@anonklub/spartan-ecdsa-worker">
<img alt="@anonklub/spartan-ecdsa-worker npm badge" src="https://img.shields.io/npm/v/%40anonklub/spartan-ecdsa-worker?logo=npm&label=%40anonklub%2Fspartan-ecdsa-worker">
</a>
<br>
<a href="https://crates.io/crates/akli">
<img alt="akli rust badge" src="https://img.shields.io/crates/v/akli?logo=rust&label=akli&color=blue">
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

| Content                                                | Description                                                                                                                                                |             Status              | Live Version                                                                                                                                                                                               |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [circom](circom)                                       | Circom circuits                                                                                                                                            |       :heavy_check_mark:        |                                                                                                                                                                                                            |
| [discord-bot](discord-bot)                             | Discord Verification Bot                                                                                                                                   | ✔️ (circom/snarkjs support only) | [anonklub-discord-bot.fly.dev](https://anonklub-discord-bot.fly.dev)                                                                                                                                       |
| [contracts](contracts)                                 | Solidity contracts                                                                                                                                         |       :heavy_check_mark:        | [Groth16Verifier](https://sepolia.etherscan.io/address/0x893f293e3918a179bf87fb772206e9927db61b0c#code) [AnonMinter](https://sepolia.etherscan.io/address/0xcc639e338f9fb382d76f30928559cf14943600e0#code) |
| nullifier                                              |                                                                                                                                                            |        :calendar: TO DO         |                                                                                                                                                                                                            |
| [pkgs/cli](pkgs/cli)                                   | Rust CLI                                                                                                                                                   |               ⏳                |                                                                                                                                                                                                            |
| [pkgs/merkle-tree-wasm](pkgs/merkle-tree-wasm)         | Merkle tree Rust crate & corresponding wasm TS package                                                                                                     |       :heavy_check_mark:        |                                                                                                                                                                                                            |
| [pkgs/merkle-tree-worker](pkgs/merkle-tree-worker)     | Web worker wrapper of the [@anonklub/merkle-tree-wasm](merkle-tree-wasm/Cargo.toml) wasm package                                                           |       :heavy_check_mark:        |                                                                                                                                                                                                            |
| [pkgs/spartan-ecdsa-wasm](pkgs/spartan-ecdsa-wasm)     | Spartan/Sapir circuits & corresponding wasm TS package.                                                                                                    |       :heavy_check_mark:        |                                                                                                                                                                                                            |
| [pkgs/spartan-ecdsa-worker](pkgs/spartan-ecdsa-worker) | Web worker wrapper of the [@anonklub/spartan](circuits/spartan/Cargo.toml) wasm package                                                                    |       :heavy_check_mark:        |                                                                                                                                                                                                            |
| [queries/crypto_ethereum](queries/crypto_ethereum)     | Google [`bigquery-public-data.crypto_ethereum`](https://console.cloud.google.com/marketplace/product/ethereum/crypto-ethereum-blockchain) queries examples |       :heavy_check_mark:        |                                                                                                                                                                                                            |
| [queries/dune_analytics](queries/dune_analytics)       | [Dune Analytics](https://dune.com/) queries examples                                                                                                       |       :heavy_check_mark:        |                                                                                                                                                                                                            |
| [queries/the_graph](queries/the_graph)                 | [The Graph](https://thegraph.com/en/) queries examples                                                                                                     |       :heavy_check_mark:        |                                                                                                                                                                                                            |
| [query-api](query-api)                                 | Query API server                                                                                                                                           |       :heavy_check_mark:        | [query.anonklub.xyz](https://query.anonklub.xyz)                                                                                                                                                           |
| [ui](ui)                                               | User Interface (fetch anonymity sets, generate or verify membership proofs)                                                                                |       :heavy_check_mark:        | [anonklub.xyz](https://anonklub.xyz)                                                                                                                                                                       |

## Develop

#### TLDR

```commandline
git clone https://github.com/anonklub/anonklub.git
cd anonklub
cp .envrc{.example,}
# edit .envrc
source .envrc
pnpm i
pnpm start.ui
```

### [Requirements](./.tool-versions)

### Environment

See [`.envrc.example`](.envrc.example).\
Copy it in an .envrc file and source it.

```commandline
cp .envrc{.example,}
# edit .envrc
source .envrc
```

### Scripts

Check available scripts with `pnpm run`.\
Especially, to start the ui or the query-api: `pnpm start.ui` or `pnpm start.query-api`.\
Don't bother run build tasks explicitly beforehand, [turbo](https://turbo.build/repo/docs) takes care of topological dependencies between tasks).

## [Contribute](https://github.com/anonklub/anonklub/contribute)
