import { Service } from 'typedi'

import {
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
    id,
    choice,
  }: {
    id: Scalars['ID']
    choice: VoteChoice
  }) {
    const { data }: { data: { proposal: Proposal } } = await execute(
      VotersPerProposalDocument,
      {
        id,
        choice,
      },
    )
    return data.proposal.votes.map((vote: Vote) => vote.voter.id)
  }

  async getPunkOwners(): Promise<string[]> {
    const { data } = await execute(PunkOwnersDocument)
    return data.punks.map((punk: Punk) => punk.owner.id)
  }
}
