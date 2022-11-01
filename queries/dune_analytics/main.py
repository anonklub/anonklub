import sys

from duneanalytics import DuneAnalytics
import pandas as pd
import os

dune = DuneAnalytics(os.environ['USERNAME'], os.environ['PASSWORD'])
dune.login()
dune.fetch_auth_token()

queries = {
    'beacon': 1499468,
    'tornado': 1499520,
    'ens_balance': 1500107
}


def run_query(query_id: int):
    result_id = dune.query_result_id(query_id=query_id)
    data = dune.query_result(result_id)

    df = pd.DataFrame.from_records([result['data'] for result in data['data']['get_result_by_result_id']])

    print(df)


run_query(queries[sys.argv[1]])

# df.to_csv(os.getcwd() + 'data.txt', header=None, index=None, sep=' ', mode='a')
