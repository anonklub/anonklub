import { utils, Wallet } from 'ethers'
import { ProofRequest } from '../src'

const message = 'Hello World'
const wallets = [...Array(10)].map(() => Wallet.createRandom())
const addresses = wallets.map((wallet) => wallet.address)
const wallet = wallets[Math.floor(Math.random() * wallets.length)]

describe('ProofRequest', () => {
  it('creates Proof Request Instance with right properties', async () => {
    const rawSignature = await wallet.signMessage(message)
    const proofRequest = new ProofRequest({
      addresses,
      message,
      rawSignature,
    })

    expect(proofRequest.addresses).toEqual(addresses)
    proofRequest.addresses.forEach((address) => {
      utils.isAddress(address)
    })
    expect(proofRequest.message).toEqual(message)
    expect(proofRequest.rawSignature).toEqual(rawSignature)
    expect(proofRequest.publicKey.x).toMatch(/^[0-9]+$/)
    expect(proofRequest.publicKey.y).toMatch(/^[0-9]+$/)
  })
})
