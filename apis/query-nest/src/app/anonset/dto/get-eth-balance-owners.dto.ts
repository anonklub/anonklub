import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

export class GetEthBalanceOwnersDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ description: 'Minimum ETH amount the addresses must own.' })
  min? = '10'
}
