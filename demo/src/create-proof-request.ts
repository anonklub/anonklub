import { Point } from '@noble/secp256k1'
import { BigNumber, utils, Wallet } from 'ethers'
import { ProofRequest } from '@anonset/membership'

export const createProofRequest = async ({
  addresses,
  privateKey,
}: {
  addresses: string[]
  privateKey: string
}) => {
  const wallet = new Wallet(privateKey)
  const { address, publicKey } = wallet
  const point = Point.fromHex(publicKey.slice(2))
  const signature = await wallet.signMessage(1234n.toString())

  return new ProofRequest({
    addresses: addresses.map((address) => BigNumber.from(address).toBigInt()),
    addressIndex: addresses.indexOf(address.toLowerCase()),
    msghash: 1234n, // could be anything
    pubkey: point,
    signature: utils.arrayify(signature),
  })
}
