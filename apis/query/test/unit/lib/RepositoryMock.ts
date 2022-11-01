import { BigQuery } from '@google-cloud/bigquery'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

export type DbMock = DeepMockProxy<BigQuery>

export const createMockContext = (): DbMock => mockDeep<BigQuery>()

