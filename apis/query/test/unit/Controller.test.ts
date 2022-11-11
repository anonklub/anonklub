import request from 'supertest'

import { QueryService } from '@services'
import { app } from 'src/app'
import { faker } from '@faker-js/faker'

describe('Routes', () => {
  let addresses: string[]

  beforeEach(() => {
    addresses = [...Array(faker.datatype.number({ max: 10 })).keys()].map(
      faker.finance.ethereumAddress,
    )
  })

  it('GET /healthcheck', async () => {
    await request(app).get('/healthcheck').expect(200)
  })

  it('GET /anonymity-set/balance/ETH', async () => {
    const min = faker.datatype.number().toString()

    jest
      .spyOn(QueryService.prototype, 'getEthBalanceAnonSet')
      .mockResolvedValueOnce(addresses)

    await request(app)
      .get('/anonymity-set/balance/ETH')
      .query({ min })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(addresses)
  })

  it('GET /anonymity-set/balance/ERC20', async () => {
    const min = faker.datatype.number().toString()
    const tokenAddress = faker.finance.ethereumAddress()
    jest
      .spyOn(QueryService.prototype, 'getErc20BalanceAnonSet')
      .mockResolvedValueOnce(addresses)

    await request(app)
      .get('/anonymity-set/balance/ERC20')
      .query({ min, tokenAddress })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(addresses)

    const { body } = await request(app)
      .get('/anonymity-set/balance/ERC20')
      .query({ min })
      .expect('Content-Type', /json/)
      .expect(400)
    expect(body).toMatchObject({ name: 'ParamRequiredError' })
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

  it('GET /anonymity-set/ens-proposal-voters', async () => {
    jest
      .spyOn(QueryService.prototype, 'getEnsProposalVoters')
      .mockResolvedValueOnce(addresses)

    await request(app)
      .get('/anonymity-set/ens-proposal-voters')
      .query({ id: faker.datatype.number(), choice: 'FOR' })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(addresses)

    const { body } = await request(app)
      .get('/anonymity-set/ens-proposal-voters')
      .query({ choice: 'FOR' })
      .expect(400)
    expect(body).toMatchObject({ name: 'ParamRequiredError' })
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
