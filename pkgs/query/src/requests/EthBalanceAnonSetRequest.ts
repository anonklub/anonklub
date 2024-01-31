import { IsNumberString } from 'class-validator'

export class EthBalanceAnonSetRequest {
  // @eslint-disable-next-line
  @IsNumberString()
  min = '100'
}
