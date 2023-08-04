import { IsNumberString } from 'class-validator'

export class getEthBalanceAnonSetQuery {
  @IsNumberString()
  min: string = '100'
}
