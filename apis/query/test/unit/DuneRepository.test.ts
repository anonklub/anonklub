import { DuneRepository } from '@repositories'

describe('DuneRepository', () => {
  it('needs DUNE_API_KEY', () => {
    delete process.env.DUNE_API_KEY

    expect(() => new DuneRepository()).toThrow('missing dune api key')
  })
})
