import { faker } from '@faker-js/faker'
import request from 'supertest'
import { QueryService } from '@services'
import { app } from 'src/app'

describe('Routes', () => {
  let addresses: string[]

  beforeEach(() => {
    addresses = [...Array(faker.datatype.number({ max: 10 })).keys()].map(
      faker.finance.ethereumAddress,
    )
  })

  describe('GET /anonymity-set/balance/ETH', () => {
    it('validates query params', async () => {
      await request(app)
        .get('/anonymity-set/balance/ERC20')
        .query({ min: '1.2' })
        .expect(400)
    })

    it('returns addresses', async () => {
      const spy = jest
        .spyOn(QueryService.prototype, 'getEthBalanceAnonSet')
        .mockResolvedValue(addresses)

      await Promise.all(
        [{ min: faker.random.numeric() }, {}].map(async (query) => {
          await request(app)
            .get('/anonymity-set/balance/ETH')
            .query(query)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(addresses)
        }),
      )

      spy.mockReset()
    })
  })

  describe('GET /anonymity-set/balance/ERC20', () => {
    it('validates query params', async () => {
      await Promise.all(
        [
          { min: '1.2', tokenAddress: faker.finance.ethereumAddress() },
          { min: '1', tokenAddress: '0x123' },
          { min: 1 },
        ].map(async (query) => {
          await request(app)
            .get('/anonymity-set/balance/ERC20')
            .query(query)
            .expect(400)
        }),
      )
    })

    it('returns addresses', async () => {
      const spy = jest
        .spyOn(QueryService.prototype, 'getErc20BalanceAnonSet')
        .mockResolvedValue(addresses)

      await Promise.all(
        [
          {
            min: faker.random.numeric(),
            tokenAddress: faker.finance.ethereumAddress(),
          },
          {
            tokenAddress: faker.finance.ethereumAddress(),
          },
        ].map(async (query) => {
          await request(app)
            .get('/anonymity-set/balance/ERC20')
            .query(query)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(addresses)
        }),
      )

      spy.mockReset()
    })
  })

  it('GET /anonymity-set/beacon', async () => {
    jest
      .spyOn(QueryService.prototype, 'getBeaconDepositors')
      .mockResolvedValueOnce(addresses)

    await request(app)
      .get('/anonymity-set/beacon')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(addresses)
  })

  describe('GET /anonymity-set/ens-proposal-voters', () => {
    it('validates query parameters', async () => {
      await Promise.all(
        [
          { choice: 'FO', id: faker.random.numeric(78) },
          {
            choice: 'FOR',
            id: faker.random.numeric(77),
          },
          { choice: 'FOR' },
          { id: faker.random.numeric(78) },
          { choice: 'AGAINST', id: faker.datatype.number() },
        ].map(async (query) => {
          await request(app)
            .get('/anonymity-set/ens-proposal-voters')
            .query(query)
            .expect(400)
        }),
      )
    })
    it('returns addresses', async () => {
      jest
        .spyOn(QueryService.prototype, 'getEnsProposalVoters')
        .mockResolvedValueOnce(addresses)

      await request(app)
        .get('/anonymity-set/ens-proposal-voters')
        .query({ choice: 'FOR', id: faker.random.numeric(78) })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(addresses)
    })
  })

  it('GET /anonymity-set/punks', async () => {
    jest
      .spyOn(QueryService.prototype, 'getPunkOwners')
      .mockResolvedValueOnce(addresses)

    await request(app)
      .get('/anonymity-set/punks')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(addresses)
  })
})
