import { BigQuery } from '@google-cloud/bigquery'
import { Service } from 'typedi'

@Service()
export class Db extends BigQuery {
  constructor() {
    const { GOOGLE_APPLICATION_CREDENTIALS, GOOGLE_CLOUD_PROJECT: projectId } =
      process.env

    if (GOOGLE_APPLICATION_CREDENTIALS === undefined)
      throw new Error('missing google credentials')
    if (projectId === undefined) throw new Error('missing google project id')

    if (process.env.NODE_ENV === 'hosted') {
      super({
        credentials: JSON.parse(GOOGLE_APPLICATION_CREDENTIALS),
        projectId,
      })
    } else {
      super({
        keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
        projectId,
      })
    }
  }
}
