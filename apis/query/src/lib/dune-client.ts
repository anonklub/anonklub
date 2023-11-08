import ms from 'ms'
import { Service } from 'typedi'
import { Headers, RequestInit } from 'undici'

export enum Query {
  Beacon = 2461144,
  Erc20 = 3183375,
  Nft = 3184511
}

enum QueryState {
  PENDING = 'QUERY_STATE_PENDING',
  EXECUTING = 'QUERY_STATE_EXECUTING',
  FAILED = 'QUERY_STATE_FAILED',
  COMPLETED = 'QUERY_STATE_COMPLETED',
  CANCELLED = 'QUERY_STATE_CANCELLED',
  EXPIRED = 'QUERY_STATE_EXPIRED',
}

interface ExecuteOk {
  execution_id: string
  state: QueryState
}

interface ApiError {
  error: string
}

interface GetQueryStatusOk {
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

interface DuneClientI {
  query: <T extends string[], U = Record<string, unknown>>(
    queryId: Query,
    params?: U,
  ) => Promise<GetQueryResultsOk<T>>
}

const POLL_INTERVAL = '2s'

@Service()
export class DuneClient implements DuneClientI {
  private readonly apiKey: string
  private readonly baseUrl = 'https://api.dune.com/api/v1'

  constructor() {
    if (process.env['DUNE_API_KEY'] === undefined)
      throw new Error('Missing DUNE_API_KEY environment variable')
    this.apiKey = process.env['DUNE_API_KEY']
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    return await fetch(`${this.baseUrl}/${endpoint}`, {
      ...options,
      // @ts-expect-error ???
      headers: new Headers({
        'x-dune-api-key': this.apiKey,
        ...options?.headers,
      }),
    }).then((res) => res.json() as T)
  }

  private async executeQuery<U>(queryId: Query, params?: U) {
    const res = await this.request<ExecuteOk | ApiError>(
      `query/${queryId}/execute`,
      {
        body: JSON.stringify({ query_parameters: params }),
        method: 'POST',
      },
    )

    if ('error' in res) throw new Error(res.error)
    return res
  }

  private async getQueryStatus(executionId: string) {
    return await this.request<GetQueryStatusOk>(
      `execution/${executionId}/status`,
    )
  }

  private async getQueryResults<T extends string[]>(executionId: string) {
    return await this.request<GetQueryResultsOk<T>>(
      `execution/${executionId}/results`,
    )
  }

  async query<T extends string[], U = Record<string, unknown>>(
    queryId: Query,
    params?: U,
  ) {
    const { execution_id: executionId } = await this.executeQuery(
      queryId,
      params,
    )
    if (executionId === undefined)
      throw new Error('Query failed to execute: executionId = `undefined`')

    let status = await this.getQueryStatus(executionId)
    while (status.state !== QueryState.COMPLETED) {
      await new Promise((resolve) => setTimeout(resolve, ms(POLL_INTERVAL)))
      status = await this.getQueryStatus(executionId)
      if (status.state === QueryState.FAILED) throw new Error('Query failed')
    }

    return await this.getQueryResults<T>(executionId)
  }
}
