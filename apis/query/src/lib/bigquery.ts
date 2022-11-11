import { BigQuery } from '@google-cloud/bigquery'
import { Service } from 'typedi'

@Service()
export class Db extends BigQuery {
  constructor() {
    super({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
    })
  }
}
