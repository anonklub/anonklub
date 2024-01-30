import { ProofRequest } from '../src'
import { addresses, merkleProof, message, rawSignature } from './data/constants'

describe('ProofRequest', () => {
  let proofRequest: ProofRequest
  beforeEach(() => {
    // FIXME
    proofRequest = new ProofRequest({
      addresses,
      merkleProof,
      message,
      rawSignature,
    })
  })

  it('creates a proof request', () => {
    expect(proofRequest.addresses).toEqual(addresses)
    expect(proofRequest.message).toEqual(message)
    expect(proofRequest.merkleProof).toEqual(merkleProof)
    expect(proofRequest.rawSignature).toEqual(rawSignature)
  })

  it.todo('generates a proof')
})
