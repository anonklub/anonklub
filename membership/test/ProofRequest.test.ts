import { ProofRequest } from '../src'
import { addresses, message, rawSignature, url } from './data/constants'

describe('ProofRequest', () => {
  let proofRequest: ProofRequest
  beforeEach(() => {
    proofRequest = new ProofRequest({
      addresses,
      message,
      rawSignature,
      url,
    })
  })

  it('creates a proof request', () => {
    expect(proofRequest.addresses).toEqual(addresses)
    expect(proofRequest.message).toEqual(message)
    expect(proofRequest.rawSignature).toEqual(rawSignature)
    expect(proofRequest.url).toEqual('http://localhost:3000')
    expect(proofRequest.jobId).toBeUndefined()
  })

  it('converts a proof request to JSON', () => {
    expect(proofRequest['toJSON']()).toEqual({
      addresses,
      message,
      rawSignature,
    })
  })

  it('serializes a proof request', () => {
    expect(proofRequest['serialize']()).toMatchInlineSnapshot(
      `"{"addresses":["0x6d9b44f7c030f8cfeeffad7145bdcc8a4df14506","0xdc5d76de6eb14aeccf3ab823e665daf56969b2bb","0xcc4db2f54ce5bfed5bbb3cca4af92b30e54ffa4f","0xf8f0e2cbffca3aad7ed11b21b11f3093ffecb80b","0xA13f841bADdEA4e4B276d42e7594babFE98DF136","0xb660addae8269eb0abea62dbd30ecff5dc44a9fb","0x8ba20b8be1eca23bc93eae8e7cba79ddf0a0a93c","0x7c6ef47ffbdbd70e7aade53cf22dfad59a46a0cd","0x298fcc9f7becb4dd25d6b9572e3fdef5cad8b7ec","0x590b8ecaeb8aa88bc265569bf54d6f43f1ac710a"],"message":"Minima ducimus in modi eligendi ea.","rawSignature":"0x0e6741344bbeea8d577f5c29f9e260d13673875298dc954d3e9a3ed3a2a7574c084f79c0def78726c8d421406c38ab692eb36fc755cab22caed22d72227627b11b"}"`,
    )
  })

  it('submits a proof request', async () => {
    fetchMock.once(JSON.stringify({ jobId: '123' }))

    await proofRequest.submit()

    expect(proofRequest.jobId).toBeDefined()
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000', {
      body: proofRequest['serialize'](),
      method: 'POST',
    })
  })

  it('gets a proof request result', async () => {
    const jobId = '321'
    const proof = { a: 'a' }
    const publicSignals = { b: 'b' }
    fetchMock.once(JSON.stringify({ jobId }))
    fetchMock.once(JSON.stringify(proof))
    fetchMock.once(JSON.stringify(publicSignals))

    await proofRequest.submit()
    const result = await proofRequest.getResult()

    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${url}/${proofRequest.jobId}/proof.json`,
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      `${url}/${proofRequest.jobId}/publicSignals.json`,
    )
    expect(result).toEqual({ proof, publicSignals })
  })

  it('throws if trying to get result before submitting', async () => {
    await expect(
      proofRequest.getResult(),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Job not submitted yet"`)
  })
})
