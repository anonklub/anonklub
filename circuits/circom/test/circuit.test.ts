import { join } from 'path'
import { wasm as wasm_tester } from 'circom_tester'
import { BigNumber, utils } from 'ethers'
import { buildPoseidon } from 'circomlibjs'
import { sign, Point } from '@noble/secp256k1'

import { F1Field, Scalar } from 'ffjavascript'
import { bigint_to_array, bigint_to_Uint8Array, Uint8Array_to_bigint } from './helpers'

// FIXME: unused?
exports.p = Scalar.fromString('21888242871839275222246405745257275088548364400416034343698204186575808495617')
const Fr = new F1Field(exports.p)

describe('Poseidon Merkle Tree', function () {
  let poseidon
  let F
  let circuit

  this.timeout(1000000)

  before(async () => {
    let p = join(__dirname, 'merkle_tree_test.circom')
    circuit = await wasm_tester(p)
    poseidon = await buildPoseidon()
    F = poseidon.F // TODO: do we actually need this or is it the default field?
  })


  it('Should check membership in a depth 2 merkle tree', async () => {
    // merkle
    const root = F.toObject(poseidon([poseidon([0, 1]), poseidon([2, 3])]))
    const path = [0, F.toObject(poseidon([2, 3]))]
    const indices = [1, 0]
    const leaf = 1

    const w = await circuit.calculateWitness({leaf: leaf, root: root, pathElements: path, pathIndices: indices}, true)
    await circuit.checkConstraints(w)
  })
})


describe('SetMembership', function () {
  this.timeout(1000 * 1000)
  let poseidon
  let F

  let circuit: any
  before(async function () {
    circuit = await wasm_tester(join(__dirname, 'membership_test.circom'))
    console.log('compiled circom')
    poseidon = await buildPoseidon()
    F = poseidon.F // TODO: do we actually need this or is it the default field?
  })

  it('Should produce valid proofs', async () => {
    const privkeys: Array<bigint> = [88549154299169935420064281163296845505587953610183896504176354567359434168161n,
                                     37706893564732085918706190942542566344879680306879183356840008504374628845468n,
                                     90388020393783788847120091912026443124559466591761394939671630294477859800601n,
                                     110977009687373213104962226057480551605828725303063265716157300460694423838923n]

    const addresses = privkeys.map(priv =>
      BigNumber.from(utils.computeAddress(BigNumber.from(priv).toHexString())).toBigInt()
    )

    const root = F.toObject(poseidon([
        poseidon([addresses[0], addresses[1]]),
        poseidon([addresses[2], addresses[3]]),
    ]))
    const path = [addresses[1], F.toObject(poseidon([addresses[2], addresses[3]]))]
    const indices = [0, 0]
    const leaf = addresses[0]

    const privkey = privkeys[0]
    const pubkey: Point = Point.fromPrivateKey(privkey)
    const msghash_bigint: bigint = 1234n
    const msghash: Uint8Array = bigint_to_Uint8Array(msghash_bigint)
    const sig: Uint8Array = await sign(msghash, bigint_to_Uint8Array(privkey), {canonical: true, der: false})
    const msghash_array: bigint[] = bigint_to_array(64, 4, msghash_bigint)

    let witness = await circuit.calculateWitness({
      'r': bigint_to_array(64, 4, Uint8Array_to_bigint(sig.slice(0, 32))),
      's': bigint_to_array(64, 4, Uint8Array_to_bigint(sig.slice(32, 64))),
      'msghash': msghash_array,
      'pubkey': [
        bigint_to_array(64, 4, pubkey.x),
        bigint_to_array(64, 4, pubkey.y)
      ],
      'pathElements': path,
      'pathIndices': indices,
      'leaf': leaf,
      'root': root,
    })

    await circuit.checkConstraints(witness)
  })

  return
})