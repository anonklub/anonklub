import { faker } from '@faker-js/faker'
import request from 'supertest'
import { QueryService } from '@services'
import { app } from 'src/app'

describe('Routes', () => {
  let addresses: string[]

  beforeEach(() => {
    addresses = [...Array(faker.datatype.number({max: 10})).keys()].map(
      faker.finance.ethereumAddress,
    )
  })

  describe('GET /anonymity-set/balance/ETH', () => {
    it.skip('validates query params', async () => {

    })
    it('returns addresses', async () => {
      const min = faker.datatype.number().toString()

      jest
        .spyOn(QueryService.prototype, 'getEthBalanceAnonSet')
        .mockResolvedValueOnce(addresses)

      await request(app)
        .get('/anonymity-set/balance/ETH')
        .query({min})
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(addresses)
    })
  })

  it('GET /anonymity-set/balance/ERC20', async () => {
    const min = faker.datatype.number().toString()
    const tokenAddress = faker.finance.ethereumAddress()
    jest
      .spyOn(QueryService.prototype, 'getErc20BalanceAnonSet')
      .mockResolvedValueOnce(addresses)

    await request(app)
      .get('/anonymity-set/balance/ERC20')
      .query({min, tokenAddress})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(addresses)

    const {body} = await request(app)
      .get('/anonymity-set/balance/ERC20')
      .query({min})
      .expect('Content-Type', /json/)
      .expect(400)
    expect(body).toMatchObject({name: 'ParamRequiredError'})
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
        .query({choice: 'FOR', id: faker.random.numeric(78)})
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
