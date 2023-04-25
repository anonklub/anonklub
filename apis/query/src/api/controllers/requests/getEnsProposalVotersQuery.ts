import { IsDefined, IsIn, IsNumberString, Length } from 'class-validator'
import { VoteChoice } from '~/graph'

export class getEnsProposalVotersQuery {
  @IsDefined()
  @IsNumberString({ no_symbols: true })
  @Length(77, 78)
  id: string

  @IsDefined()
  @IsIn(['FOR', 'AGAINST', 'ABSTAIN'])
  choice: VoteChoice
}
