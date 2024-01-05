select
  distinct(wallet_address)
from
  balances_ethereum.erc20_latest
where
  token_address = '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72'
  and amount > 0
