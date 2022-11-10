import { Controller } from '@controllers/Controller'
import { CryptoEthereumRepository } from '@repositories'
import { QueryService } from '@services'
import { createMockContext, DbMock } from './lib/RepositoryMock'
import { logger } from '~/logger'
// import { objectContainsValue } from 'jest-mock-extended'

describe('Controller', () => {
  let dbMock: DbMock
  let itemController: Controller

  beforeEach(() => {
    dbMock = createMockContext()
    itemController = new Controller(
      new QueryService(new CryptoEthereumRepository(dbMock), logger),
    )
  })

  describe('anonymitySet', () => {
    it('Gets anonymity set based on ETH balance', async () => {
      const addresses = ['0xfoo', '0xbar']

      // @ts-expect-error
      dbMock.query.mockResolvedValue([addresses.map(address=>({address}))])

      await expect(
        itemController.ethBalanceAnonymitySet('10'),
      ).resolves.toMatchObject(addresses)
    })
  })
})
