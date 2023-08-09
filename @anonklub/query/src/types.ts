import {
  EnsProposalVotersRequest,
  Erc20BalanceAnonSetRequest,
  EthBalanceAnonSetRequest,
} from 'requests'

export enum Environment {
  PRODUCTION = 'production',
  STAGING = 'staging',
}

type ExclusiveResponse<T, U> = (T & { error?: never }) | (U & { data?: never })

export interface DataResponse {
  data: string[]
}

interface ErrorResponse {
  error: Error
}

export type AnonSetResponse = ExclusiveResponse<DataResponse, ErrorResponse>

export enum Choice {
  For = 'FOR',
  Against = 'AGAINST',
  Abstain = 'ABSTAIN',
}

export enum Endpoint {
  BeaconDepositors = 'beacon',
  Erc20Balance = 'balance/ERC20',
  EnsProposalVoters = 'ens-proposal-voters',
  CryptoPunks = 'punks',
  EthBalance = 'balance/ETH',
}

export type RequestClass =
  | EthBalanceAnonSetRequest
  | EnsProposalVotersRequest
  | Erc20BalanceAnonSetRequest

export type Request<T extends RequestClass> = {
  [K in keyof T]: T[K] extends Choice ? Choice : string
}
