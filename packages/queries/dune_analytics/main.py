import json
import os

from duneapi.api import DuneAPI
from duneapi.types import DuneQuery, DashboardTile

queries = {"beacon": 1499468, "tornado": 1499520, "erc20_balance": 1500107}

dune_api = DuneAPI(os.environ["DUNE_USER"], os.environ["DUNE_PWD"])
dune_api.login()

parameters = [
    {"key": "min", "type": "number", "value": 10},
    {"key": "tokenAddress", "type": "text", "value": "'0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'"},
]
query_id = queries["erc20_balance"]

# duneapi api is a bit weird, can't simply pass a query id and execute, need to provide a query_file parameter even
# if unused
dashboard_tile = DashboardTile.from_dict(
    {"id": query_id, "parameters": parameters, "query_file": "./empty", "network": "mainnet"}, "."
)
dune_query = DuneQuery.from_tile(dashboard_tile)
records = dune_api.execute_and_await_results(dune_query)

print(json.dumps([r["address"] for r in records]))
