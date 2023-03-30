import { Point } from '@noble/secp256k1'
import { utils } from 'ethers'

export class ProofRequest {
  readonly addresses: string[]
  readonly messageDigest: string
  readonly publicKey: { x: string; y: string }
  readonly rawSignature: string

  constructor({
    addresses,
    message,
    rawSignature,
  }: {
    addresses: string[]
    rawSignature: string
    message: string
  }) {
    this.addresses = addresses
    this.rawSignature = rawSignature
    const publicKey = Point.fromHex(
      utils.recoverPublicKey(utils.hashMessage(message), rawSignature).slice(2),
    )
    this.publicKey = { x: publicKey.x.toString(), y: publicKey.y.toString() }
    this.messageDigest = utils.hashMessage(message)
  }
}
