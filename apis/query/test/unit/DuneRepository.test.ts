import { DuneRepository } from '../../../src/api/repositories/DuneRepository'
import { DuneClient } from '../../../src/dune-client'
import { mock, instance, when, anything } from 'ts-mockito'
import { getErc20BalanceAnonSetQuery } from '../../../src/api/controllers/requests'

describe('DuneRepository', () => {
  let duneClient: DuneClient
  let duneClientMock: DuneClient
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
  it('queryBeaconDepositors', async () => {
    when(duneClientMock.query(anything())).thenResolve(['0x123', '0x456'])

    const result = await duneRepository.queryBeaconDepositors()
    expect(result).toEqual(['0x123', '0x456'])
  })

  it('queryNftOwners', async () => {
    const tokenAddress = '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72'
    when(duneClientMock.query(anything(), anything())).thenResolve(['0x123', '0x456'])

    const result = await duneRepository.queryNftOwners(tokenAddress)
    expect(result).toEqual(['0x123', '0x456'])
  })
})
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
