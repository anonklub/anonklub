import { Controller } from '@controllers/Controller'
import { CryptoEthereumRepository } from '@repositories'
import { CryptoEthereumService } from '@services'
import { createMockContext, DbMock } from './lib/RepositoryMock'
import { logger } from '~/logger'
// import { objectContainsValue } from 'jest-mock-extended'

describe('Controller', () => {
  let dbMock: DbMock
  let itemController: Controller

  beforeEach(() => {
    dbMock = createMockContext()
    itemController = new Controller(
      new CryptoEthereumService(new CryptoEthereumRepository(dbMock), logger),
    )
  })

  describe('anonymitySet', () => {
    it('Gets anonymity set based on ETH balance', async () => {
      const addresses = ['0xfoo', '0xbar']

      // @ts-ignore
      dbMock.query.mockResolvedValue([addresses.map(address=>({address}))])

      await expect(
        itemController.anonymitySet('ETH', '10'),
      ).resolves.toMatchObject(addresses)
    })
  })
})
