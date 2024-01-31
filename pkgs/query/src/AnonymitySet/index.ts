import { URLS } from '../CONSTANTS'
import { fetchJson } from '../fetch-json'
import {
  EnsProposalVotersRequest,
  Erc20BalanceAnonSetRequest,
  EthBalanceAnonSetRequest,
} from '../requests'
import { Endpoint, Environment, Request, RequestClass } from '../types'
import { AnonymitySetI } from './interface'

export class AnonymitySet implements AnonymitySetI {
  constructor(public env = Environment.PRODUCTION) {}

  fromBeaconDepositors = this._fetchWithoutParams(Endpoint.BeaconDepositors)

  fromCryptoPunkOwners = this._fetchWithoutParams(Endpoint.CryptoPunks)

  fromErc20Balance = this._fetchWithParams<Erc20BalanceAnonSetRequest>(
    Endpoint.Erc20Balance,
  )

  fromEthBalance = this._fetchWithParams<EthBalanceAnonSetRequest>(
    Endpoint.EthBalance,
  )

  fromEnsProposalVoters = this._fetchWithParams<EnsProposalVotersRequest>(
    Endpoint.EnsProposalVoters,
  )

  private _fetchWithParams<T extends RequestClass>(endpoint: Endpoint) {
    return async (params: Request<T>) =>
      await fetchJson(`${URLS[this.env]}/${endpoint}`, params)
  }

  private _fetchWithoutParams(endpoint: Endpoint) {
    return async () => await fetchJson(`${URLS[this.env]}/${endpoint}`)
  }
}
