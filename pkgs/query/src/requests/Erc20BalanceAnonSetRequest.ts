import { IsDefined, IsEthereumAddress, IsNumberString, IsOptional } from 'class-validator'

export class Erc20BalanceAnonSetRequest {
  @IsOptional()
  @IsNumberString({ no_symbols: true })
  min: string

  @IsDefined()
  @IsEthereumAddress()
  tokenAddress: string
}
