export enum Query {
  Beacon = 2461144,
  Erc20 = 3183375,
  Nft = 3184511,
}

export enum QueryState {
  PENDING = 'QUERY_STATE_PENDING',
  FAILED = 'QUERY_STATE_FAILED',
  COMPLETED = 'QUERY_STATE_COMPLETED',
  EXPIRED = 'QUERY_STATE_EXPIRED',
}

export interface ExecuteOk {
  execution_id: string
  state: QueryState
}

export interface ApiError {
  error: string
}

export interface GetQueryStatusOk {
  execution_id: string
  query_id: number
  state: QueryState
}

export interface GetQueryResultsOk<T extends string[]> {
  execution_id: string
  query_id: number
  state: QueryState
  result: {
    rows: Array<Record<T[number], any>>
    metadata: { column_names: keyof T }
  }
}

export interface DuneClientI {
  query: <T extends string[], U = Record<string, unknown>>(
    queryId: Query,
    params?: U,
  ) => Promise<GetQueryResultsOk<T>>
}
