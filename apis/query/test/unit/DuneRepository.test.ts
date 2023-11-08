import { faker } from '@faker-js/faker'
import { DuneRepository } from '@repositories'
import { DuneClient } from '~/dune-client'

jest.setTimeout(30_000)

describe('DuneRepository', () => {
  const ENV = process.env

  beforeEach(() => {
    process.env = { ...ENV }
  })

  afterAll(() => {
    process.env = ENV
  })

  it('needs DUNE_API_KEY', () => {
    delete process.env['DUNE_API_KEY']

    expect(
      () => new DuneRepository(new DuneClient()),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Missing DUNE_API_KEY environment variable"`,
    )
  })

  it('fetch query results', async () => {
    const duneRepository = new DuneRepository(new DuneClient())
    const min = '3000'
    const tokenAddress = '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72'

    jest.spyOn(duneRepository.dune, 'query').mockResolvedValueOnce({
      // @ts-expect-error don't bother with the full response
      result: {
        rows: [...Array(faker.datatype.number({ max: 10, min: 1 })).keys()].map(
          () => ({
            address: faker.finance.ethereumAddress(),
          }),
        ),
      },
    })
    const { result } = await duneRepository.queryErc20Balance({
      min,
      tokenAddress,
    })

    expect(result?.rows).toBeDefined()
    expect(result?.rows.length).toBeGreaterThan(0)
    expect(result?.rows[0]?.['address']).toBeDefined()
    expect(result?.rows[0]?.['address'].startsWith('0x')).toBe(true)
  })
})
