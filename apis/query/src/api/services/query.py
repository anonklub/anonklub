import json
import os
import sys

from duneapi.api import DuneAPI
from duneapi.types import QueryParameter

QUERY_PARAM_TYPES = {
    'enum': QueryParameter.enum_type,
    'date': QueryParameter.date_type,
    'number': QueryParameter.number_type,
    'text': QueryParameter.text_type,
}


def parse_parameters(_parameters: str):
    return [QUERY_PARAM_TYPES[p['type']](p['name'], p['value']) for p in json.loads(_parameters)]


dune = DuneAPI(os.environ['DUNE_USER'], os.environ['DUNE_PWD'])
dune.login()

query_id = int(sys.argv[1])

# [{\"name\":\"min\",\"type\":\"number\",\"value\":10},{\"name\":\"tokenAddress\",\"type\":\"text\",\"value\":\"'0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'\"}]
parameters = None
if len(sys.argv[1:]) == 2:
    parameters = parse_parameters(sys.argv[2])

job_id = dune.execute(query_id, parameters)
records = dune.get_results(job_id)

print(json.dumps([r['address'] for r in records]))
