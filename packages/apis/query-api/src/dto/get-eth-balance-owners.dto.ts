import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

export class GetEthBalanceOwnersDto {
  @ApiPropertyOptional({
    description: 'Minimum ETH amount the addresses must own.',
    required: false,
    example: '10',
    type: 'number',
  })
  @IsOptional()
  @IsNumberString()
  min? = '10'
}
