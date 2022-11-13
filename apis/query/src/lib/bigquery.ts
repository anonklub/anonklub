import { BigQuery } from '@google-cloud/bigquery'
import { Service } from 'typedi'

const prop = process.env.NODE_ENV === 'hosted' ? 'credentials' : 'keyFilename'

@Service()
export class Db extends BigQuery {
  constructor() {
    super({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      [prop]: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    })
  }
}
