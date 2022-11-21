import { IsInt } from 'class-validator'

export class getEthBalanceAnonSetQuery {
  @IsInt()
  min = 0
}
