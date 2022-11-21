import { IsDefined, IsEthereumAddress, IsInt } from 'class-validator'

export class getErc20BalanceAnonSetQuery {
  @IsInt()
  min = 0

  @IsDefined()
  @IsEthereumAddress()
  tokenAddress: string
}
