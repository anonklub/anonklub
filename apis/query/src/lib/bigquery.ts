import { Service } from 'typedi'
import { BigQuery } from '@google-cloud/bigquery'

@Service()
export class Db extends BigQuery {
  constructor() {
    super({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    })
  }
}
