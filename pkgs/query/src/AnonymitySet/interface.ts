import type { EnsProposalVotersRequest, Erc20BalanceAnonSetRequest, EthBalanceAnonSetRequest } from '../requests'
import type { AnonSetResponse } from '../types'

export interface AnonymitySetI {
  fromEthBalance: ({
    min,
  }: EthBalanceAnonSetRequest) => Promise<AnonSetResponse>
  fromErc20Balance: ({
    min,
    tokenAddress,
  }: Erc20BalanceAnonSetRequest) => Promise<AnonSetResponse>
  fromEnsProposalVoters: ({
    choice,
    id,
  }: EnsProposalVotersRequest) => Promise<AnonSetResponse>
  fromBeaconDepositors: () => Promise<AnonSetResponse>
  fromCryptoPunkOwners: () => Promise<AnonSetResponse>
}
