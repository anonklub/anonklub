# Akli

Command line to interact with [anonklub query api](https://query.anonklub.xyz).

## Examples

- Query

  - ETH balance anonset

  ```shell
  cargo run --release -- query eth --min 10000
  ```

  - ERC20 balance anonset

  ```shell
  cargo run --release -- query erc20 --address 0xc18360217d8f7ab5e7c516566761ea12ce7f9d72 --min 5000
  ```

- Merkle
  - Proof
  ```shell
  cargo run --release -- merkle proof -f tests/fixtures/addresses.json -a 0x30b86f843a10ec6b28e8fa76b8b86d8317c708b6
  ```
  - Root
  ```shell
  cargo run --release merkle proof -f tests/fixtures/addresses.json
  ```
