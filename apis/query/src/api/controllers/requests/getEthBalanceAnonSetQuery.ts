import { IsNumberString } from 'class-validator'

export class getEthBalanceAnonSetQuery {
  @IsNumberString()
  min = '100'
}
