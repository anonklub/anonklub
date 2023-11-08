import { faker } from '@faker-js/faker'
import request from 'supertest'
import { QueryService } from '@services'
// FIXME: fix module resolution
import { app } from '../../src/app'

describe('AnonymitySet Controller', () => {
  let addresses: string[]

  beforeEach(() => {
    addresses = [...Array(faker.datatype.number({ max: 10 })).keys()].map(
      faker.finance.ethereumAddress,
    )
  })

  describe('GET /balance/ETH', () => {
import { AnonymitySet } from '../../../src/api/controllers/AnonymitySet'
import { getErc20BalanceAnonSetQuery, getEthBalanceAnonSetQuery, getEnsProposalVotersQuery, getNftOwnersAnonSetQuery } from '../../../src/api/controllers/requests'
import { QueryService } from '../../../src/api/services/QueryService'
import { Service } from 'typedi'
import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { mock, instance, when, anything } from 'ts-mockito'

let app: any
let queryService: QueryService
let queryServiceMock: QueryService

beforeAll(() => {
  queryService = new QueryService()
  queryServiceMock = mock(QueryService)
  when(queryServiceMock.getEthBalanceAnonSet(anything())).thenResolve(['0x123', '0x456'])
  when(queryServiceMock.getErc20BalanceAnonSet(anything())).thenResolve(['0x123', '0x456'])
  when(queryServiceMock.getBeaconDepositors()).thenResolve(['0x123', '0x456'])
  when(queryServiceMock.getEnsProposalVoters(anything())).thenResolve(['0x123', '0x456'])
  when(queryServiceMock.getPunkOwners()).thenResolve(['0x123', '0x456'])
  when(queryServiceMock.getNftOwners(anything())).thenResolve(['0x123', '0x456'])

  Container.set(QueryService, instance(queryServiceMock))
  useContainer(Container)
  app = createExpressServer({
    controllers: [AnonymitySet],
  })
})
    it('validates query params', async () => {
      // expects number string
      await request(app).get('/balance/ETH').query({ min: '0x11' }).expect(400)
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
          .get('/balance/ERC20')
          .query({ min, tokenAddress })
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(addresses)

        expect(spy).toHaveBeenLastCalledWith({
          min: min ?? '0',
          tokenAddress,
        })
      }

      spy.mockReset()
  it('returns addresses', async () => {
    const response = await request(app).get('/beacon')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(['0x123', '0x456'])
  })
        .spyOn(QueryService.prototype, 'getEthBalanceAnonSet')
        .mockResolvedValue(addresses)

      for (const query of [{ min: faker.random.numeric() }, {}]) {
        await request(app)
          .get('/balance/ETH')
          .query(query)
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(addresses)
        expect(spy).toHaveBeenLastCalledWith(query?.min ?? '100')
      }

      spy.mockReset()
    })
  })

  describe('GET /balance/ERC20', () => {
    it('validates query params', async () => {
      await Promise.all(
        [
          { min: '1.2', tokenAddress: faker.finance.ethereumAddress() },
          { min: '1', tokenAddress: '0x123' },
          { min: 1 },
        ].map(async (query) => {
          await request(app).get('/balance/ERC20').query(query).expect(400)
        }),
      )
    })

    it('returns addresses', async () => {
  it('returns addresses', async () => {
    const response = await request(app).get('/balance/ERC20').query({ min: '1', tokenAddress: '0x123' })
    expect(response.status).toBe(200)
    expect(response.body).toEqual(['0x123', '0x456'])
  })
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
          .get('/balance/ERC20')
          .query({ min, tokenAddress })
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(addresses)

        expect(spy).toHaveBeenLastCalledWith({
          min: min ?? '0',
          tokenAddress,
        })
      }

      spy.mockReset()
    })
  })

  it('GET /beacon', async () => {
    jest
      .spyOn(QueryService.prototype, 'getBeaconDepositors')
      .mockResolvedValueOnce(addresses)

    await request(app)
      .get('/beacon')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(addresses)
  })

  describe('GET /ens-proposal-voters', () => {
    it('validates query parameters', async () => {
      await Promise.all(
        [
          { choice: 'FO', id: faker.random.numeric(78) },
          {
            choice: 'FOR',
            id: faker.random.numeric(76),
          },
          { choice: 'FOR' },
          { id: faker.random.numeric(78) },
          { choice: 'AGAINST', id: faker.datatype.number() },
        ].map(async (query) => {
          await request(app)
            .get('/ens-proposal-voters')
            .query(query)
            .expect(400)
        }),
      )
    })

    it('returns addresses', async () => {
  it('returns addresses', async () => {
    const response = await request(app).get('/punks')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(['0x123', '0x456'])
  })
  it('returns addresses', async () => {
    const response = await request(app).get('/ens-proposal-voters').query({ choice: 'FOR', id: '1' })
    expect(response.status).toBe(200)
    expect(response.body).toEqual(['0x123', '0x456'])
  })
    it('validates query parameters', async () => {
      await Promise.all(
        [
          { choice: 'FO', id: faker.random.numeric(78) },
          {
            choice: 'FOR',
            id: faker.random.numeric(76),
          },
          { choice: 'FOR' },
          { id: faker.random.numeric(78) },
          { choice: 'AGAINST', id: faker.datatype.number() },
        ].map(async (query) => {
          await request(app)
            .get('/ens-proposal-voters')
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
          .get('/ens-proposal-voters')
          .query(query)
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(addresses)

        expect(spy).toHaveBeenLastCalledWith(query)
      }

      spy.mockReset()
    })
  })

  it('GET /punks', async () => {
    jest
      .spyOn(QueryService.prototype, 'getPunkOwners')
      .mockResolvedValueOnce(addresses)

    await request(app)
      .get('/punks')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(addresses)
  })
})
  it('returns addresses', async () => {
    const response = await request(app).get('/nft').query({ tokenAddress: '0x123' })
    expect(response.status).toBe(200)
    expect(response.body).toEqual(['0x123', '0x456'])
  })
  describe('GET /balance/ETH', () => {
    it('validates query params', async () => {
      // expects number string
      await request(app).get('/balance/ETH').query({ min: '0x11' }).expect(400)
    })

    it('returns addresses', async () => {
      const spy = jest
        .spyOn(QueryService.prototype, 'getEthBalanceAnonSet')
        .mockResolvedValue(addresses)

      for (const query of [{ min: faker.random.numeric() }, {}]) {
        await request(app)
          .get('/balance/ETH')
          .query(query)
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(addresses)
        expect(spy).toHaveBeenLastCalledWith(query?.min ?? '100')
      }

      spy.mockReset()
    })
  })
  it('returns addresses', async () => {
    const response = await request(app).get('/balance/ETH').query({ min: '1' })
    expect(response.status).toBe(200)
    expect(response.body).toEqual(['0x123', '0x456'])
  })
  it('GET /punks', async () => {
    jest
      .spyOn(QueryService.prototype, 'getPunkOwners')
      .mockResolvedValueOnce(addresses)

    await request(app)
      .get('/punks')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(addresses)
  })
})
