import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsIn, IsNumberString, Length } from 'class-validator'
import { VoteChoice } from '~/graph'

export class GetEnsProposalVotersDto {
  @IsDefined()
  @IsNumberString(
    { no_symbols: true },
    {
      message:
        'Must be a valid ENS ID proposal (number string of 77-78 length without symbols)',
    },
  )
  @Length(77, 78)
  @ApiProperty({
    description:
      'The ID of the ENS Proposal (can be found e.g. on [tally.xyz](https://www.tally.xyz/gov/ens/proposals)).',
  })
  id: string

  @IsDefined()
  @IsIn(['FOR', 'AGAINST', 'ABSTAIN'])
  choice: VoteChoice
}
