import { Point } from '@noble/secp256k1'
import { utils } from 'ethers'
import { bigintToArray } from '../helpers'
import { MerkleTree } from '../MerkleTree'
import { CircuitInputArgs, CircuitInputInterface } from './interface'

export class CircuitInput implements CircuitInputInterface {
  readonly pubkey: bigint[][]
  readonly msghash: bigint[]
  readonly root: bigint
  readonly pathIndices: number[]
  readonly pathElements: bigint[]
  readonly s: bigint[]
  readonly r: bigint[]

  constructor({ field, hashFunction, proofRequest }: CircuitInputArgs) {
    const { addresses, message, rawSignature } = proofRequest

    const _publicKey = Point.fromHex(
      utils.recoverPublicKey(utils.hashMessage(message), rawSignature).slice(2),
    )
    const publicKey = { x: _publicKey.x.toString(), y: _publicKey.y.toString() }
    const messageDigest = utils.hashMessage(message)
    const address = utils.recoverAddress(
      messageDigest,
      proofRequest.rawSignature,
    )
    const addressIndex = proofRequest.addresses.indexOf(address)
    const tree = new MerkleTree(
      addresses.map((address) => BigInt(address)),
      21,
      hashFunction,
      field,
    )
    const merkleProof = tree.merkleProof(addressIndex)
    const { r, s } = utils.splitSignature(rawSignature)

    this.root = tree.root()
    this.msghash = bigintToArray(64, 4, BigInt(messageDigest))
    this.pathElements = merkleProof.pathElements
    this.pathIndices = merkleProof.pathIndices
    this.pubkey = [
      bigintToArray(64, 4, BigInt(publicKey.x)),
      bigintToArray(64, 4, BigInt(publicKey.y)),
    ]
    this.r = bigintToArray(64, 4, BigInt(r))
    this.s = bigintToArray(64, 4, BigInt(s))
  }

  serialize() {
    return JSON.stringify(
      this,
      (_, value) =>
        ['number', 'bigint'].includes(typeof value) ? value.toString() : value, // circom circuits expect all parameters as strings
    )
  }
}
