import json
import pathlib
import os
import sys

from duneapi.api import DuneAPI
from duneapi.types import DashboardTile, DuneQuery

dune = DuneAPI(os.environ["DUNE_USER"], os.environ["DUNE_PWD"])
dune.login()

path = str(pathlib.Path(__file__).parent.resolve())
query_id = int(sys.argv[1])
parameters = None

# [{\"name\":\"min\",\"type\":\"number\",\"value\":10},{\"name\":\"tokenAddress\",\"type\":\"text\",\"value\":\"'0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'\"}]
if len(sys.argv[1:]) == 2:
    parameters = json.loads(sys.argv[2])

# duneapi api is a bit weird, can't simply pass a query id and execute, need to provide a query_file parameter even
# if unused
dashboard_tile = DashboardTile.from_dict(
    {"id": query_id, "parameters": parameters, "query_file": "empty.js", "network": "mainnet"}, path
)
dune_query = DuneQuery.from_tile(dashboard_tile)
records = dune.execute_and_await_results(dune_query)

print(json.dumps([r["address"] for r in records]))
