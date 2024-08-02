import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsIn, IsNumberString, Length } from 'class-validator'
import type { VoteChoice } from '../repositories/graph-client/index'

export class GetEnsProposalVotersDto {
  @IsDefined()
  @IsNumberString(
    { no_symbols: true },
    {
      message: 'Must be a valid ENS ID proposal (number string of 77-78 length without symbols)',
    },
  )
  @Length(77, 78)
  @ApiProperty({
    description:
      'The ID of the ENS Proposal (can be found e.g. on [tally.xyz](https://www.tally.xyz/gov/ens/proposals)).',
    example: '15706104363492914432572227540113855373051896881975394006732444538096386655538',
  })
  id: string

  @IsDefined()
  @IsIn(['FOR', 'AGAINST', 'ABSTAIN'])
  @ApiProperty({
    description: 'The vote choice.',
    enum: ['FOR', 'AGAINST', 'ABSTAIN'],
  })
  choice: VoteChoice
}
