-- https://dune.com/queries/1499468?d=1&category=canonical&namespace=ethereum&table=transactions&blockchains=ethereum
select distinct(`from`) as address
from ethereum.transactions
where `to` = '0x00000000219ab540356cbb839cbe05303d7705fa'