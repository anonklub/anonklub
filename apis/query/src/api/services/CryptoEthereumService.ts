import { Service } from 'typedi'

import { Logger, LoggerInterface } from '@decorators/Logger'
import { CryptoEthereumRepository } from '@repositories'

@Service()
export class CryptoEthereumService {
  constructor(
    public repository: CryptoEthereumRepository,
    @Logger() private logger: LoggerInterface,
  ) {}

  async getEthBalanceAnonymitySet(balance: string) {
    return this.repository.queryEthBalance(balance).then((addresses) => {
      this.logger.info('Get ETH-balance based anonymity set')
      return addresses
    })
  }
}
