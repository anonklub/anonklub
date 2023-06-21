# Contracts

### Deploy

`pn --filter contracts deploy.sepolia`

| Network | Address                                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Sepolia | [0xcc639e338f9fb382d76f30928559cf14943600e0](https://sepolia.etherscan.io/address/0xcc639e338f9fb382d76f30928559cf14943600e0#code) |

The merkle root use as constructor argument to deploy this contract corresponds to all the addresses that own at least 360 ENS on mainnet as of block somewhere around 17361666 (don't remember exactly 😅).

### Verify

Somehow verification at deployment with `forge create --verify` or even `forge verify-contract` failed.  
So instead use `--show-standard-json-input` to get json input and upload that file manually to etherscan.  
See `pn --filter contracts verify`
