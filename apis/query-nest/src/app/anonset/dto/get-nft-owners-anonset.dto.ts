import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEthereumAddress } from 'class-validator'

export class GetNftOwnersDto {
  @IsDefined()
  @IsEthereumAddress()
  @ApiProperty({ description: 'The NFT contract address.' })
  tokenAddress: string
}
