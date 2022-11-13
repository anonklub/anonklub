import { Service } from 'typedi'

import {
  BeaconDepositorsDocument,
  Depositor,
  execute,
  Proposal,
  Punk,
  PunkOwnersDocument,
  Scalars,
  Vote,
  VoteChoice,
  VotersPerProposalDocument,
} from '~/graph'

@Service()
export class GraphRepository {
  async getEnsProposalVoters({
    choice,
    id,
  }: {
    id: Scalars['ID']
    choice: VoteChoice
  }) {
    const { data }: { data: { proposal: Proposal } } = await execute(
      VotersPerProposalDocument,
      {
        choice,
        id,
      },
    )
    return data.proposal.votes.map((vote: Vote) => vote.voter.id)
  }

  async getPunkOwners(): Promise<string[]> {
    const { data } = await execute(PunkOwnersDocument)
    return data.punks.map((punk: Punk) => punk.owner.id)
  }

  async getBeaconDepositors() {
    const { data } = await execute(BeaconDepositorsDocument)
    return data.depositors.map((depositor: Depositor) => depositor.id)
  }
}
