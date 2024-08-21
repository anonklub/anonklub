import { IsNumberString } from 'class-validator'

export class EthBalanceAnonSetRequest {
  @IsNumberString()
  min = '100'
}
