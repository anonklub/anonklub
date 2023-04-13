import { Point } from '@noble/secp256k1'
import { stringifyWithBigInts } from './helpers'

export interface ProofRequestArgs {
  addresses: bigint[]
  signature: Uint8Array
  msghash: bigint
  addressIndex: number
  pubkey: Point
}

export class ProofRequest {
  addresses: bigint[]
  signature: Uint8Array
  msghash: bigint
  addressIndex: number
  pubkey: Point

  constructor({
    addresses,
    addressIndex,
    msghash,
    pubkey,
    signature,
  }: ProofRequestArgs) {
    this.addresses = addresses
    this.signature = signature
    this.msghash = msghash
    this.addressIndex = addressIndex
    this.pubkey = pubkey
  }

  stringify() {
    return stringifyWithBigInts(this)
  }

  static fromReq(req) {
    for (let i = 0; i < req.addresses.length; i++) {
      req.addresses[i] = BigInt(req.addresses[i])
    }
    req.pubkey = new Point(BigInt(req.pubkey.x), BigInt(req.pubkey.y))
    req.msghash = BigInt(req.msghash)
    req.signature = Uint8Array.from(Object.values(req.signature))
    return req
  }
}
