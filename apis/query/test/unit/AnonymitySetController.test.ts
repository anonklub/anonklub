import { faker } from '@faker-js/faker'
import request from 'supertest'
import { QueryService } from '@services'
import { app } from 'src/app'

describe('AnonymitySet Controller', () => {
  let addresses: string[]

  beforeEach(() => {
    addresses = [...Array(faker.datatype.number({ max: 10 })).keys()].map(
      faker.finance.ethereumAddress,
    )
  })

  describe('GET /anonymity-set/balance/ETH', () => {
    it('validates query params', async () => {
      await request(app)
        .get('/anonymity-set/balance/ETH')
        .query({ min: '1.2' })
        .expect(400)
    })

    it('returns addresses', async () => {
      const spy = jest
        .spyOn(QueryService.prototype, 'getEthBalanceAnonSet')
        .mockResolvedValue(addresses)

      for (const query of [{ min: faker.random.numeric() }, {}]) {
        await request(app)
          .get('/anonymity-set/balance/ETH')
          .query(query)
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(addresses)
        expect(spy).toHaveBeenLastCalledWith(Number(query?.min ?? 0))
      }

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

      for (const { min, tokenAddress } of [
        {
          min: faker.random.numeric(),
          tokenAddress: faker.finance.ethereumAddress(),
        },
        {
          tokenAddress: faker.finance.ethereumAddress(),
        },
      ]) {
        await request(app)
          .get('/anonymity-set/balance/ERC20')
          .query({ min, tokenAddress })
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(addresses)

        expect(spy).toHaveBeenLastCalledWith({
          min: Number(min ?? 0),
          tokenAddress,
        })
      }

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
      const spy = jest
        .spyOn(QueryService.prototype, 'getEnsProposalVoters')
        .mockResolvedValue(addresses)

      for (const query of [
        { choice: 'FOR', id: faker.random.numeric(78) },
        {
          choice: 'AGAINST',
          id: faker.random.numeric(78),
        },
        { choice: 'ABSTAIN', id: faker.random.numeric(78) },
      ]) {
        await request(app)
          .get('/anonymity-set/ens-proposal-voters')
          .query(query)
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(addresses)

        expect(spy).toHaveBeenLastCalledWith(query)
      }

      spy.mockReset()
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
