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

### Mint

[//]: # (TODO: improve script)

Example:
```shell
cast send --private-key $DEPLOYER_PRIVATEKEY --rpc-url $SEPOLIA_RPC_URL --chain 11155111 0xCC639e338F9fb382D76F30928559Cf14943600E0 "mint(address,uint,uint[2],uint[2][2],uint[2],uint[5])" 0xc122c870eA9179989C57A8F4cBf409B6BfDc99
88 123 $(tsnd circuits/circom/scripts/generate-calldata-base10.ts)
```
[tx](https://sepolia.etherscan.io/tx/0x01953438db7c63444d1d2b89a553d0fe7033c1d3219ca797f767f9a08e54187a)