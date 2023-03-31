import { hmac } from '@noble/hashes/hmac'
import { sha256 } from '@noble/hashes/sha256'
import { signSync, utils as secp256k1utils } from '@noble/secp256k1'
import { BigNumber, utils } from 'ethers'
import { bigintToUint8Array } from '../src'

secp256k1utils.hmacSha256Sync = (key, ...msgs) =>
  hmac(sha256, key, secp256k1utils.concatBytes(...msgs))
secp256k1utils.sha256Sync = (...msgs) =>
  sha256(secp256k1utils.concatBytes(...msgs))

const privateKeysBigInt = [
  88549154299169935420064281163296845505587953610183896504176354567359434168161n,
  37706893564732085918706190942542566344879680306879183356840008504374628845468n,
  90388020393783788847120091912026443124559466591761394939671630294477859800601n,
  110977009687373213104962226057480551605828725303063265716157300460694423838923n,
]

const msghash = 1234n
const msghashArray: Uint8Array = bigintToUint8Array(msghash)
const [signature, n] = signSync(
  msghashArray,
  bigintToUint8Array(privateKeysBigInt[0]),
  {
    canonical: true,
    der: false,
    recovered: true,
  },
)

it('sig generated with ethers SigningKey matches nobles', () => {
  const signingKey = new utils.SigningKey(
    BigNumber.from(privateKeysBigInt[0]).toHexString(),
  )
  const msgDigest = utils.hexlify(
    // MUST PAD
    utils.zeroPad(utils.arrayify(BigNumber.from(msghash)), 32),
  )
  const ethersSig = signingKey.signDigest(msgDigest)

  expect(utils.joinSignature(ethersSig)).toBe(
    // recovery parameter
    utils.hexlify(signature).concat(n === 1 ? '1c' : '1b'),
  )
})
