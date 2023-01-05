import { IsDefined, IsEthereumAddress, IsNumberString, IsOptional } from 'class-validator'

export class getErc20BalanceAnonSetQuery {
  @IsOptional()
  @IsNumberString({no_symbols: true})
  min: string

  @IsDefined()
  @IsEthereumAddress()
  tokenAddress: string
}
