import { IsDefined, IsEthereumAddress, IsInt } from 'class-validator'

export class getErc20BalanceAnonSetQuery {
  @IsInt()
  min: number

  @IsDefined()
  @IsEthereumAddress()
  tokenAddress: string
}
