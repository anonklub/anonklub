import { IsDefined, IsIn, IsNumberString, Length } from 'class-validator'
import { Choice } from '../types'

export class EnsProposalVotersRequest {
  @IsDefined()
  @IsNumberString({ no_symbols: true })
  @Length(77, 78)
  id: string

  @IsDefined()
  @IsIn([Choice.For, Choice.Against, Choice.Abstain])
  choice: Choice
}
