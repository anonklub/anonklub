import {
  JsonController,
  Get,
  QueryParam,
  NotFoundError,
} from 'routing-controllers'
import { Service } from 'typedi'

import { CryptoEthereumService } from '@services'

@Service()
@JsonController()
export class Controller {
  constructor(private service: CryptoEthereumService) {}

  @Get('/anonymity-set/balance')
  async anonymitySet(
    @QueryParam('asset') asset: string,
    @QueryParam('balance') balance: string,
  ) {
    switch (asset) {
      case 'ETH':
        return this.service.getEthBalanceAnonymitySet(balance)
      default:
        throw new NotFoundError('asset not supported')
    }
  }
}
