import http from 'http'
import { ProofRequest } from './interface'
import { Point, signSync, utils as secp256k1utils } from '@noble/secp256k1'
import { BigNumber, utils } from 'ethers'

import { hmac } from '@noble/hashes/hmac'
import { sha256 } from '@noble/hashes/sha256'
secp256k1utils.hmacSha256Sync = (key, ...msgs) =>
  hmac(sha256, key, secp256k1utils.concatBytes(...msgs))
secp256k1utils.sha256Sync = (...msgs) =>
  sha256(secp256k1utils.concatBytes(...msgs))

import { bigintToUint8Array } from '../test/helpers'

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

const address_index = 0
const privkey = privkeys[address_index]
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
const postData = new ProofRequest(
  addresses,
  signature,
  msghash,
  address_index,
  pubkey,
).stringify()

var options = {
  host: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
}

const req = http.request(options, function (res) {
  res.setEncoding('utf8')
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk)
  })
})

req.write(postData)
req.end()
