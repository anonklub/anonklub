import { Injectable } from '@nestjs/common'
import ms from 'ms'
import {
  ApiError,
  DuneClientI,
  ExecuteOk,
  GetQueryResultsOk,
  GetQueryStatusOk,
  Query as DuneQuery,
  QueryState,
} from './types'

export { DuneQuery }

const POLL_INTERVAL = '2s'

@Injectable()
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
    console.log("API key", this.apiKey);
    return await fetch(`${this.baseUrl}/${endpoint}`, {
      ...options,
      headers: new Headers({
        'x-dune-api-key': this.apiKey,
        ...options?.headers,
      }),
    }).then((res) => res.json() as T).catch((e) => { throw new Error(e) })
  }

  private async executeQuery<U>(queryId: DuneQuery, params?: U) {
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
    queryId: DuneQuery,
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
