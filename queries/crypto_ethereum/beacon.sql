select distinct(from_address)
from ethereum-analytics-366016.crypto_ethereum.transactions
where to_address = "0x00000000219ab540356cbb839cbe05303d7705fa" and value = 32e18
