import path from 'path'

import { Service } from 'typedi'

import { python } from '~/dune'

export enum ParameterType {
  Enum = 'enum',
  Text = 'text',
  Number = 'number',
  Date = 'date',
}

export enum Query {
  Erc20 = '1500107',
  Beacon = '1499468',
}

const SCRIPT_PATH = path.join(__dirname, '..', '..', 'lib', 'dune', 'query.py')

@Service()
export class DuneRepository {
  public async executeDuneQuery(
    queryId: Query,
    parameters?: Array<{
      key: string
      type: ParameterType
      value: string | number
    }>,
  ) {
    return parameters !== undefined
      ? python(SCRIPT_PATH, queryId, JSON.stringify(parameters))
      : python(SCRIPT_PATH, queryId)
  }
}
