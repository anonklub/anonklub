import {
  execute,
  Proposal,
  Scalars,
  Vote,
  VoteChoice,
  VotersPerProposalDocument,
} from '../../.graphclient'

export const getVotersPerProposal = async (
  id: Scalars['ID'],
  choice: VoteChoice,
) => {
  const { data }: { data: { proposal: Proposal } } = await execute(
    VotersPerProposalDocument,
    {
      id,
      choice,
    },
  )
  return data.proposal.votes.map((vote: Vote) => vote.voter.id)
}
