import { Point } from '@noble/secp256k1'
import { deserialize, serialize } from 'v8'

export class ProofRequest {
  addresses: bigint[]
  signature: Uint8Array
  msghash: bigint
  address_index: number
  pubkey: Point

  constructor(
    addresses: bigint[],
    signature: Uint8Array,
    msghash: bigint,
    address_index: number,
    pubkey: Point,
  ) {
    this.addresses = addresses
    this.signature = signature
    this.msghash = msghash
    this.address_index = address_index
    this.pubkey = pubkey
  }

  stringify() {
    return stringifyWithBigInts(this)
  }

  static fromReq(req) {
    for (var i = 0; i < req.addresses.length; i++) {
      req.addresses[i] = BigInt(req.addresses[i])
    }
    req.pubkey = new Point(BigInt(req.pubkey.x), BigInt(req.pubkey.y))
    req.msghash = BigInt(req.msghash)
    req.signature = Uint8Array.from(Object.values(req.signature))
    return req
  }
}

export function stringifyWithBigInts(data) {
  return JSON.stringify(
    data,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
  )
}

interface ProofResponse {}
