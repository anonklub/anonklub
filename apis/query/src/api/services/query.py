import json
import os
import sys

from duneanalytics import DuneAnalytics

dune = DuneAnalytics(os.environ['DUNE_USER'], os.environ['DUNE_PWD'])
dune.login()
dune.fetch_auth_token()

query_id = int(sys.argv[1])
query_result_id = dune.query_result_id(query_id=query_id)
data = dune.query_result(query_result_id)['data']['get_result_by_result_id']

print(json.dumps([row['data']['address'] for row in data]))
