import { faker } from '@faker-js/faker'
import { Container } from 'typedi'

import { Db } from '~/bigquery'
import { DuneRepository, GraphRepository } from '@repositories'
import { QueryService } from '@services'

describe('Service', () => {
  const queryService = Container.get(QueryService)
  let addresses:string[]
  let min:string
  let tokenAddress:string

  beforeEach(() => {
    addresses = [...Array(faker.datatype.number({max:10})).keys()].map(faker.finance.ethereumAddress)
    tokenAddress = faker.finance.ethereumAddress()
    min = faker.datatype.number().toString()

  })

  describe('Get a list of addresses that', () => {
    it('have a min ETH balance', async () => {
      jest
        .spyOn(Db.prototype, 'query')
      // @ts-expect-error
        .mockResolvedValueOnce([addresses.map((address) => ({ address }))])

      await expect(queryService.getEthBalanceAnonSet('10'),).resolves.toMatchObject(addresses)
    })

    it('have a min ERC20 balance', async () => {
      jest.spyOn(DuneRepository.prototype, 'executeDuneQuery').mockResolvedValueOnce(addresses)
      await expect(queryService.getErc20BalanceAnonSet({min, tokenAddress})).resolves.toMatchObject(addresses)
    })

    it('deposited into the Beacon Contract', async () => {
      jest.spyOn(DuneRepository.prototype, 'executeDuneQuery').mockResolvedValueOnce(addresses)
      await expect(queryService.getBeaconDepositors()).resolves.toMatchObject(addresses)
    })

    it('own a cryptopunk', async () => {
      jest.spyOn(GraphRepository.prototype, 'getPunkOwners').mockResolvedValueOnce(addresses)
      await expect(queryService.getPunkOwners()).resolves.toMatchObject(addresses)
    })

    it('voted for/against an ENS governance proposal', async () => {
      jest.spyOn(GraphRepository.prototype, 'getEnsProposalVoters').mockResolvedValueOnce(addresses)
      await expect(queryService.getEnsProposalVoters({id:"1234", choice: 'FOR'})).resolves.toMatchObject(addresses)
    })
  })
})
