import { ApiProperty } from '@nestjs/swagger'
import {
  IsDefined,
  IsEthereumAddress,
  IsNumberString,
  IsOptional,
} from 'class-validator'

export class GetErc20BalanceOwnersDto {
  @IsOptional()
  @IsNumberString(
    { no_symbols: true },
    { message: 'Must be a number string without symbols.' },
  )
  @ApiProperty({ description: 'Minimum ERC20 amount the addresses must own.' })
  min = '0'

  @IsDefined()
  @IsEthereumAddress()
  @ApiProperty({ description: 'The ERC20 contract address.' })
  tokenAddress: string
}
