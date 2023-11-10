import { BigQuery } from '@google-cloud/bigquery'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BigqueryClient extends BigQuery {
  constructor() {
    const {
      GOOGLE_APPLICATION_CREDENTIALS,
      GOOGLE_CLOUD_PROJECT: projectId,
      NODE_ENV,
    } = process.env

    if (NODE_ENV === 'test') {
      super({
        credentials: {},
        projectId: '',
      })
    } else {
      if (GOOGLE_APPLICATION_CREDENTIALS === undefined)
        throw new Error('missing google credentials')
      if (projectId === undefined) throw new Error('missing google project id')

      super({
        credentials: JSON.parse(GOOGLE_APPLICATION_CREDENTIALS),
        projectId,
      })
    }
  }
}
