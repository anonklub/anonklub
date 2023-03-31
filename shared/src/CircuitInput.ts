import { utils } from 'ethers'
import { bigintToArray, stringifyWithBigInts } from './helpers'
import { Serializable } from './interfaces'
import { MerkleTree } from './MerkleTree'
import { ProofRequest } from './ProofRequest'

export class CircuitInput implements Serializable {
  readonly pubkey: bigint[][]
  readonly msghash: bigint[]
  readonly root: bigint
  readonly pathIndices: number[]
  readonly pathElements: bigint[]
  readonly s: bigint[]
  readonly r: bigint[]

  constructor({
    poseidon,
    proofRequest,
    msghash,
  }: {
    poseidon: any
    proofRequest: ProofRequest
    msghash?: bigint
  }) {
    const { addresses, messageDigest, publicKey, rawSignature } = proofRequest
    const address = utils.recoverAddress(
      messageDigest,
      proofRequest.rawSignature,
    )
    const addressIndex = proofRequest.addresses.indexOf(address)
    const tree = new MerkleTree(
      addresses.map((address) => BigInt(address)),
      21,
      poseidon,
      poseidon.F,
    )
    const merkleProof = tree.merkleProof(addressIndex)

    this.root = tree.root()
    this.msghash = bigintToArray(64, 4, msghash ?? BigInt(messageDigest))
    this.pathElements = merkleProof.pathElements
    this.pathIndices = merkleProof.pathIndices
    this.pubkey = [
      bigintToArray(64, 4, BigInt(publicKey.x)),
      bigintToArray(64, 4, BigInt(publicKey.y)),
    ]
    const { r, s } = utils.splitSignature(rawSignature)
    this.r = bigintToArray(64, 4, BigInt(r))
    this.s = bigintToArray(64, 4, BigInt(s))
  }

  serialize() {
    return stringifyWithBigInts(this)
  }
}
