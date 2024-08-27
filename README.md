![anonklub banner](https://raw.githubusercontent.com/anonklub/assets/main/img/anonklub-banner-2.jpg)

> [!Warning]
>
> This project has been sunset and isn't being actively worked on anymore.
> The previously deployed services (query API, UI, discord bot) have been shut down. So the corresponding links (_anonklub.xyz_, _docs.anonklub.xyz_, _query.anonklub.xyz_) in docs/README(s) won't work.

<p align="center">
AnonKlub focuses on building applications that allow for secure and anonymous proof of membership.
It does so by performing both ECDSA signatures and Merkle Tree inclusion verifications in a SNARK.
It enables privacy applications such as anonymous airdrops, anonymous NFT minting, anonymous chat groups…<br><br>
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
</p>

| Content                                                | Description                                                                                                                                                |             Status              |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------: |
| [discord-bot](discord-bot)                             | Discord Verification Bot                                                                                                                                   | ✔️ (circom/snarkjs support only) |
| nullifier                                              |                                                                                                                                                            |        :calendar: TO DO         |
| [pkgs/cli](pkgs/cli)                                   | Rust CLI                                                                                                                                                   |               ⏳                |
| [pkgs/merkle-tree-wasm](pkgs/merkle-tree-wasm)         | Merkle tree Rust crate & corresponding wasm TS package                                                                                                     |       :heavy_check_mark:        |
| [pkgs/merkle-tree-worker](pkgs/merkle-tree-worker)     | Web worker wrapper of the [@anonklub/merkle-tree-wasm](merkle-tree-wasm/Cargo.toml) wasm package                                                           |       :heavy_check_mark:        |
| [pkgs/spartan-ecdsa-wasm](pkgs/spartan-ecdsa-wasm)     | Spartan/Sapir circuits & corresponding wasm TS package.                                                                                                    |       :heavy_check_mark:        |
| [pkgs/spartan-ecdsa-worker](pkgs/spartan-ecdsa-worker) | Web worker wrapper of the [@anonklub/spartan](circuits/spartan/Cargo.toml) wasm package                                                                    |       :heavy_check_mark:        |
| [queries/crypto_ethereum](queries/crypto_ethereum)     | Google [`bigquery-public-data.crypto_ethereum`](https://console.cloud.google.com/marketplace/product/ethereum/crypto-ethereum-blockchain) queries examples |       :heavy_check_mark:        |
| [queries/dune_analytics](queries/dune_analytics)       | [Dune Analytics](https://dune.com/) queries examples                                                                                                       |       :heavy_check_mark:        |
| [queries/the_graph](queries/the_graph)                 | [The Graph](https://thegraph.com/en/) queries examples                                                                                                     |       :heavy_check_mark:        |
| [query-api](query-api)                                 | Query API server                                                                                                                                           |       :heavy_check_mark:        |
| [ui](ui)                                               | User Interface (fetch anonymity sets, generate or verify membership proofs)                                                                                |       :heavy_check_mark:        |

## Archive branches

- [`archive/circom`](https://github.com/anonklub/anonklub/tree/archive/circom)

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
Don't bother running build tasks explicitly beforehand: [turbo](https://turbo.build/repo/docs) takes care of topological dependencies between tasks.

## [Contribute](https://github.com/anonklub/anonklub/contribute)
