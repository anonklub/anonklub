import { Point, sign } from '@noble/secp256k1'
import { wasm as wasm_tester } from 'circom_tester'
import { buildPoseidon } from 'circomlibjs'
import { BigNumber, utils } from 'ethers'
import { Scalar } from 'ffjavascript'

import { join } from 'path'
import {
  bigintToArray,
  bigintToUint8Array,
  uint8ArrayToBigint,
} from './helpers'

// FIXME: unused?
exports.p = Scalar.fromString(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617',
)

describe('Poseidon Merkle Tree', function () {
  let poseidon
  let F
  let circuit

  this.timeout(1000000)

  before(async () => {
    const p = join(__dirname, 'merkle_tree_test.circom')
    circuit = await wasm_tester(
      p,
      // { "verbose": true }
    )
    poseidon = await buildPoseidon()
    F = poseidon.F // TODO: do we actually need this or is it the default field?
  })

  it('Should check membership in a depth 2 merkle tree', async () => {
    // merkle
    const leaf = 2
    const root = F.toObject(poseidon([poseidon([1, 2]), poseidon([3, 4])]))
    const path = [1, F.toObject(poseidon([3, 4]))]
    const indices = [1, 0]

    console.log(circuit.calculateWitness[0])
    const w = await circuit.calculateWitness(
      { leaf, pathElements: path, pathIndices: indices, root },
      true,
    )
    await circuit.checkConstraints(w)
  })
})

describe('SetMembership', function () {
  this.timeout(1000 * 1000)
  let poseidon
  let F

  let circuit: any
  before(async function () {
    circuit = await wasm_tester(join(__dirname, 'membership_test.circom'), {
      verbose: true,
    })
    console.log('compiled circom')
    poseidon = await buildPoseidon()
    F = poseidon.F // TODO: do we actually need this or is it the default field?
  })

  it('Should produce valid proofs', async () => {
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

    const merkleRoot = F.toObject(
      poseidon(
        poseidon([addresses[0], addresses[1]]),
        poseidon([addresses[2], addresses[3]]),
      ),
    )
    const path = [
      addresses[1],
      F.toObject(poseidon([addresses[2], addresses[3]])),
    ]
    const indices = [0, 0]
    const leaf = addresses[0]

    const privkey = privkeys[0]
    const pubkey: Point = Point.fromPrivateKey(privkey)
    const msghashBigInt = 1234n
    const msghash: Uint8Array = bigintToUint8Array(msghashBigInt)
    const sig: Uint8Array = await sign(msghash, bigintToUint8Array(privkey), {
      canonical: true,
      der: false,
    })
    const msghashArray: bigint[] = bigintToArray(64, 4, msghashBigInt)

    const witness = await circuit.calculateWitness({
      leaf,
      msghash: msghashArray,
      pathElements: path,
      pathIndices: indices,
      pubkey: [bigintToArray(64, 4, pubkey.x), bigintToArray(64, 4, pubkey.y)],
      r: bigintToArray(64, 4, uint8ArrayToBigint(sig.slice(0, 32))),
      root: merkleRoot,
      s: bigintToArray(64, 4, uint8ArrayToBigint(sig.slice(32, 64))),
    })

    await circuit.checkConstraints(witness)
  })
})
