select distinct(depositor) as address
from tornado_cash.deposits
union
select distinct(recipient)
from tornado_cash.withdrawals