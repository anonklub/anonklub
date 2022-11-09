import os

from duneapi.api import DuneAPI
from duneapi.types import QueryParameter

queries = {
    'beacon': 1499468,
    'tornado': 1499520,
    'erc20_balance': 1500107
}

dune_api = DuneAPI(os.environ['DUNE_USER'], os.environ['DUNE_PWD'])
dune_api.login()

parameters = [QueryParameter.number_type('min', 10),
              QueryParameter.text_type('tokenAddress',
                                       "'0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'")]


job_id = dune_api.execute(queries['erc20_balance'], parameters)
records = dune_api.get_results(job_id)

print([r['address'] for r in records])
