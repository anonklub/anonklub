import { hmac } from '@noble/hashes/hmac'
import { sha256 } from '@noble/hashes/sha256'
import { Point, signSync, utils as secp256k1utils } from '@noble/secp256k1'
import { BigNumber, utils } from 'ethers'

import {
  bigintToUint8Array,
  CircuitInput,
  memoPoseidon,
  ProofRequest,
  stringifyWithBigInts,
} from '../src'

import proofRequestJson from './data/input.json'

secp256k1utils.hmacSha256Sync = (key, ...msgs) =>
  hmac(sha256, key, secp256k1utils.concatBytes(...msgs))
secp256k1utils.sha256Sync = (...msgs) =>
  sha256(secp256k1utils.concatBytes(...msgs))

const privkeys: bigint[] = [
  88549154299169935420064281163296845505587953610183896504176354567359434168161n,
  37706893564732085918706190942542566344879680306879183356840008504374628845468n,
  90388020393783788847120091912026443124559466591761394939671630294477859800601n,
  110977009687373213104962226057480551605828725303063265716157300460694423838923n,
]

const addresses = privkeys.map((priv) =>
  BigNumber.from(
    utils.computeAddress(BigNumber.from(priv).toHexString()),
  ).toBigInt(),
)

describe('ProofRequest', () => {
  let poseidon: any
  beforeAll(async () => {
    poseidon = await memoPoseidon()
  })
  it('should stringify', () => {
    const addressIndex = 0
    const privkey = privkeys[addressIndex]
    const pubkey: Point = Point.fromPrivateKey(privkey)
    const msghash = 1234n
    const msghashArray: Uint8Array = bigintToUint8Array(msghash)
    const signature: Uint8Array = signSync(
      msghashArray,
      bigintToUint8Array(privkey),
      {
        canonical: true,
        der: false,
      },
    )
    const postData = new ProofRequest({
      addresses,
      addressIndex,
      msghash,
      pubkey,
      signature,
    }).stringify()

    const circuitInput = new CircuitInput({
      poseidon,
      proofRequest: JSON.parse(postData),
    })

    expect(JSON.parse(stringifyWithBigInts(circuitInput))).toEqual(
      proofRequestJson,
    )
  })
})
