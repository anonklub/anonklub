import { IsDefined, IsEthereumAddress } from 'class-validator'

export class getNftOwnersAnonSetQuery {
  @IsDefined()
  @IsEthereumAddress()
  tokenAddress: string
}
