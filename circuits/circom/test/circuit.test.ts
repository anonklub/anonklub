import { Point, sign } from '@noble/secp256k1'
import { wasm as wasm_tester } from 'circom_tester'
import { buildPoseidon } from 'circomlibjs'
import { BigNumber, utils } from 'ethers'
import { join } from 'path'
import {
  bigintToArray,
  bigintToUint8Array,
  ExcludableMerkleTree,
  maxAddress,
  MerkleTree,
  minAddress,
  uint8ArrayToBigint,
} from '@anonset/membership'

jest.setTimeout(10_000_000) // ~1 hour

describe('Poseidon Merkle Tree', function () {
  let poseidon
  let F
  let circuit

  beforeAll(async () => {
    const p = join(__dirname, 'merkle_tree_test.circom')
    circuit = await wasm_tester(p)
    poseidon = await buildPoseidon()
    F = poseidon.F // TODO: do we actually need this or is it the default field?
  })

  it('Should check membership in a depth 2 merkle tree', async () => {
    const tree = new MerkleTree([0n, 1n, 2n, 3n], 3, poseidon, F)
    const leaf = 1
    const { pathElements, pathIndices } = tree.merkleProof(leaf)

    const w = await circuit.calculateWitness(
      { leaf, pathElements, pathIndices, root: tree.root() },
      true,
    )
    await circuit.checkConstraints(w)
  })

  it('Should generate merkle proofs', () => {
    const pathElements = [0n, F.toObject(poseidon([2, 3]))]
    const pathIndices = [1, 0]
    const tree = new MerkleTree([0n, 1n, 2n, 3n], 3, poseidon, F)

    expect(tree.merkleProof(1)).toEqual({ pathElements, pathIndices })
  })

  it('Should generate exclusion proofs', () => {
    expect(
      new ExcludableMerkleTree([10n, 1000n], 3, poseidon, F).exclusionProof(
        99n,
      ),
    ).toEqual({
      leaves: [10n, 1000n],
      pathElements: [
        [minAddress, F.toObject(poseidon([1000n, maxAddress]))],
        [maxAddress, F.toObject(poseidon([minAddress, 10n]))],
      ],
      pathIndices: [
        [1, 0],
        [0, 1],
      ],
    })
  })

  it('Should generate merkle roots', () => {
    expect(new MerkleTree([0n], 2, poseidon, F).root()).toEqual(
      F.toObject(poseidon([0, 0])),
    )
    expect(new MerkleTree([0n, 1n], 2, poseidon, F).root()).toEqual(
      F.toObject(poseidon([0, 1])),
    )
    expect(new MerkleTree([0n, 1n, 2n], 3, poseidon, F).root()).toEqual(
      F.toObject(
        poseidon([F.toObject(poseidon([0, 1])), F.toObject(poseidon([2, 0]))]),
      ),
    )

    expect(new MerkleTree([0n, 1n, 2n, 3n], 3, poseidon, F).root()).toEqual(
      F.toObject(
        poseidon([F.toObject(poseidon([0, 1])), F.toObject(poseidon([2, 3]))]),
      ),
    )

    expect(new MerkleTree([0n, 1n, 2n, 3n, 4n], 4, poseidon, F).root()).toEqual(
      F.toObject(
        poseidon([
          F.toObject(
            poseidon([
              F.toObject(poseidon([0, 1])),
              F.toObject(poseidon([2, 3])),
            ]),
          ),
          F.toObject(poseidon([F.toObject(poseidon([4, 0])), 0])),
        ]),
      ),
    )

    expect(
      new MerkleTree([0n, 1n, 2n, 3n, 4n, 5n], 4, poseidon, F).root(),
    ).toEqual(
      F.toObject(
        poseidon([
          F.toObject(
            poseidon([
              F.toObject(poseidon([0, 1])),
              F.toObject(poseidon([2, 3])),
            ]),
          ),
          F.toObject(poseidon([F.toObject(poseidon([4, 5])), 0])),
        ]),
      ),
    )

    expect(
      new MerkleTree([0n, 1n, 2n, 3n, 4n, 5n, 6n], 4, poseidon, F).root(),
    ).toEqual(
      F.toObject(
        poseidon([
          F.toObject(
            poseidon([
              F.toObject(poseidon([0, 1])),
              F.toObject(poseidon([2, 3])),
            ]),
          ),
          F.toObject(
            poseidon([
              F.toObject(poseidon([4, 5])),
              F.toObject(poseidon([6, 0])),
            ]),
          ),
        ]),
      ),
    )

    expect(
      new MerkleTree([0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n], 4, poseidon, F).root(),
    ).toEqual(
      F.toObject(
        poseidon([
          F.toObject(
            poseidon([
              F.toObject(poseidon([0, 1])),
              F.toObject(poseidon([2, 3])),
            ]),
          ),
          F.toObject(
            poseidon([
              F.toObject(poseidon([4, 5])),
              F.toObject(poseidon([6, 7])),
            ]),
          ),
        ]),
      ),
    )
  })
})

describe('SetMembership', function () {
  let poseidon
  let F
  let membershipCircuit
  let nonMembershipCircuit

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

  beforeAll(async function () {
    membershipCircuit = await wasm_tester(
      join(__dirname, 'membership_test.circom'),
    )
    nonMembershipCircuit = await wasm_tester(
      join(__dirname, 'non_membership_test.circom'),
    )
    poseidon = await buildPoseidon()
    F = poseidon.F // TODO: do we actually need this or is it the default field?
  })

  it('Should accept valid inclusion proofs', async () => {
    const tree = new MerkleTree(addresses, 3, poseidon, F)
    const merkleProof = tree.merkleProof(0)

    const privkey = privkeys[0]
    const pubkey: Point = Point.fromPrivateKey(privkey)
    const msghashBigint = 1234n
    const msghash: Uint8Array = bigintToUint8Array(msghashBigint)
    const sig: Uint8Array = await sign(msghash, bigintToUint8Array(privkey), {
      canonical: true,
      der: false,
    })
    const msghashArray: bigint[] = bigintToArray(64, 4, msghashBigint)

    const witness = await membershipCircuit.calculateWitness({
      msghash: msghashArray,
      pathElements: merkleProof.pathElements,
      pathIndices: merkleProof.pathIndices,
      pubkey: [bigintToArray(64, 4, pubkey.x), bigintToArray(64, 4, pubkey.y)],
      r: bigintToArray(64, 4, uint8ArrayToBigint(sig.slice(0, 32))),
      root: tree.root(),
      s: bigintToArray(64, 4, uint8ArrayToBigint(sig.slice(32, 64))),
    })

    await membershipCircuit.checkConstraints(witness)
  })

  it('Should accept valid exclusion proofs', async () => {
    // Generate exclusion proof
    const inTree = [addresses[1], addresses[2]]
    const tree = new ExcludableMerkleTree(inTree, 3, poseidon, F)
    const exclusionProof = tree.exclusionProof(addresses[0])

    // Sign a message
    const privkey = privkeys[0]
    const pubkey: Point = Point.fromPrivateKey(privkey)
    const msghashBigint = 1234n
    const msghash: Uint8Array = bigintToUint8Array(msghashBigint)
    const sig: Uint8Array = await sign(msghash, bigintToUint8Array(privkey), {
      canonical: true,
      der: false,
    })
    const msghashArray: bigint[] = bigintToArray(64, 4, msghashBigint)

    // Make ZK proof witness
    const witness = await nonMembershipCircuit.calculateWitness({
      leaves: exclusionProof.leaves,
      msghash: msghashArray,
      pathElements: exclusionProof.pathElements,
      pathIndices: exclusionProof.pathIndices,
      pubkey: [bigintToArray(64, 4, pubkey.x), bigintToArray(64, 4, pubkey.y)],
      r: bigintToArray(64, 4, uint8ArrayToBigint(sig.slice(0, 32))),
      root: tree.root(),
      s: bigintToArray(64, 4, uint8ArrayToBigint(sig.slice(32, 64))),
    })

    await nonMembershipCircuit.checkConstraints(witness)
  })
})

describe('ECDSACheckPubKey', function () {
  const testCases: Array<[bigint, bigint]> = []
  const privkeys: bigint[] = [
    88549154299169935420064281163296845505587953610183896504176354567359434168161n,
    37706893564732085918706190942542566344879680306879183356840008504374628845468n,
    90388020393783788847120091912026443124559466591761394939671630294477859800601n,
    110977009687373213104962226057480551605828725303063265716157300460694423838923n,
  ]

  for (let idx = 0; idx < privkeys.length; idx++) {
    const pubkey: Point = Point.fromPrivateKey(privkeys[idx])
    testCases.push([pubkey.x, pubkey.y])
  }

  let circuit: any
  beforeAll(async function () {
    circuit = await wasm_tester(
      join(__dirname, 'test_ecdsa_check_pub_key.circom'),
    )
  })

  const testECDSAVerify = function (testCase: [bigint, bigint]) {
    const pub0 = testCase[0]
    const pub1 = testCase[1]

    const pub0Array: bigint[] = bigintToArray(64, 4, pub0)
    const pub1Array: bigint[] = bigintToArray(64, 4, pub1)
    it(`Testing valid pub key: pub0: ${pub0} pub1: ${pub1}`, async function () {
      const witness = await circuit.calculateWitness({
        pubkey: [pub0Array, pub1Array],
      })
      await circuit.checkConstraints(witness)
    })
  }

  testCases.forEach(testECDSAVerify)
})

describe('Ordering', function () {
  let orderingCircuit
  beforeAll(async function () {
    orderingCircuit = await wasm_tester(
      join(__dirname, 'is_ordered_test.circom'),
    )
  })

  it('Should check ordering', async () => {
    let witness = await orderingCircuit.calculateWitness({
      addresses: [1, 2, 3, 4],
    })
    await orderingCircuit.checkConstraints(witness)
    await orderingCircuit.assertOut(witness, { out: 1n })

    witness = await orderingCircuit.calculateWitness({
      addresses: [1, 2, 4, 3],
    })
    await orderingCircuit.checkConstraints(witness)
    await orderingCircuit.assertOut(witness, { out: 0n })
  })
})
