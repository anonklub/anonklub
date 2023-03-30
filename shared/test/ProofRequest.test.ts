import { utils, Wallet } from 'ethers'
import { ProofRequest } from '../src'
import { ADDRESSES, MESSAGE, PRIVATE_KEY } from './data/constants'

const wallet = new Wallet(PRIVATE_KEY)

describe('ProofRequest', () => {
  it('constructs Proof Request Instance with right properties', async () => {
    const rawSignature = await wallet.signMessage(MESSAGE)
    const proofRequest = new ProofRequest({
      addresses: ADDRESSES,
      message: MESSAGE,
      rawSignature,
    })

    expect(proofRequest.addresses).toEqual(ADDRESSES)
    proofRequest.addresses.forEach((address) => {
      utils.isAddress(address)
    })
    expect(proofRequest.messageDigest).toEqual(utils.hashMessage(MESSAGE))
    expect(proofRequest.rawSignature).toEqual(rawSignature)
    expect(proofRequest.publicKey.x).toMatch(/^[0-9]+$/)
    expect(proofRequest.publicKey.y).toMatch(/^[0-9]+$/)
  })

  it('serializes Proof Request Instance to JSON', async () => {
    const rawSignature = await wallet.signMessage(MESSAGE)
    const proofRequest = new ProofRequest({
      addresses: ADDRESSES,
      message: MESSAGE,
      rawSignature,
    })

    const serializedProofRequest = proofRequest.serialize()
    expect(serializedProofRequest).toMatchInlineSnapshot(
      `"{"addresses":["0x56F6608C4D012b4e4095403C7f19a2B2FA5cb019","0x765f698a308Fb5201De91e8f6304dc3e2A61Bc72","0x312e3FcB7d984Ea8E18cD64cBfaa266CBa9Cd3b3","0x968C32dDd80716E8CFDCCbe62967CCb86BDD02D5","0x95351d3536620049f499C17d81B1e1580270b96C","0x62f9b49aEE1e2f2C114cA8d7f57919C825e4E518","0x06D48A1Ee2eb464eAA25b991BDC1f902BF48a819","0xE9dA6711bC0ae88233B73430271037c477B271Aa","0x276b024F257ac4AA23b2A40a84d2CEd696F285d4","0x1E5D40E7A78E0B6FBABBD217906D019a4a52bf49"],"rawSignature":"0x737515055c70100f2326fa93db00c2b22a0eb267267c542fc3838d35bed782c3252e2d926e8dfddb0f622caa2004eb7138a9ec70a59c41f3eb034ec4f91e3fc31c","publicKey":{"x":"27352369949601348268909976607108118046641080910118109116043675983399438258146","y":"37915210039971993084843051152524615589514653100802623717520465440054270952112"},"messageDigest":"0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2"}"`,
    )
    expect(JSON.parse(serializedProofRequest)).toEqual({
      addresses: ADDRESSES,
      messageDigest: utils.hashMessage(MESSAGE),
      publicKey: {
        x: proofRequest.publicKey.x,
        y: proofRequest.publicKey.y,
      },
      rawSignature,
    })
  })
})
