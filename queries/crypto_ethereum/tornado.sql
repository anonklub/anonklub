-- dune analytics
-- select distinct(contract_address) from tornado_cash.deposits
-- union
-- select distinct(contract_address) from tornado_cash.withdrawals

-- select distinct(contract_address) from tornado_cash.deposits
-- union
-- select distinct(contract_address) from tornado_cash.withdrawals

select distinct(from_address)
from ethereum-analytics-366016.crypto_ethereum.transactions
where to_address in (
    "0x0836222f2b2b24a3f36f98668ed8f0b38d1a872f",
    "0x1e34a77868e19a6647b1f2f47b51ed72dede95dd",
    "0x47ce0c6ed5b0ce3d3a51fdb1c52dc66a7c3c2936",
    "0xf67721a2d8f736e75a49fdd7fad2e31d8676542a",
    "0xdf231d99ff8b6c6cbf4e9b9a945cbacef9339178",
    "0xbb93e510bbcd0b7beb5a853875f9ec60275cf498",
    "0x07687e702b410fa43f4cb4af7fa097918ffd2730",
    "0x22aaa7720ddd5388a3c0a3333430953c68f1849b",
    "0x4736dcf1b7a3d580672cce6e7c65cd5cc9cfba9d",
    "0xb529a618ffedefe5cfa4df8dbb0b32d8c29ca2e8",
    "0xa5c2254e4253490c54cef0a4347fddb8f75a4998",
    "0xaf4c0b70b2ea9fb7487c7cbb37ada259579fe040",
    "0x169ad27a470d064dede56a2d3ff727986b15d52b",
    "0x23773e65ed146a459791799d01336db287f25334",
    "0xaf8d1839c3c67cf571aa74b5c12398d4901147b3",
    "0xa160cdab225685da1d56aa342ad8841c3b53f291",
    "0x84443cfd09a48af6ef360c6976c5392ac5023a1f",
    "0x610b717796ad172b316836ac95a2ffad065ceab4",
    "0x910cbd523d972eb0a6f4cae4618ad62622b39dbf",
    "0xd47438c816c9e7f2e2888e060936a499af9582b3",
    "0xd96f2b1c14db8458374d9aca76e26c3d18364307",
    "0xf60dd140cff0706bae9cd734ac3ae76ad9ebc32a",
    "0x12d66f87a04a9e220743712ce6d9bb1b5616b8fc",
    "0x330bdfade01ee9bf63c209ee33102dd334618e0a",
    "0xba214c1c1928a32bffe790263e38b4af9bfcd659"
)