import { Proof } from '../src/Proof'
import proofData from './data/proof'
import publicSignalsData from './data/public'

describe('Proof', () => {
  let proof: Proof

  beforeEach(() => {
    proof = new Proof({
      proof: proofData,
      publicSignals: publicSignalsData,
    })
  })

  it('creates a new instance', () => {
    expect(proof).toBeDefined()
    expect(proof).toBeInstanceOf(Proof)
    expect(proof.publicSignals).toEqual(publicSignalsData)
  })

  it('verifies the proof', async () => {
    const result = await proof.verify('offchain')
    expect(result).toBeTruthy()
  })
})
