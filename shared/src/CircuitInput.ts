import { utils } from 'ethers'
import { bigintToArray } from './helpers'
import { MerkleTree } from './MerkleTree'
import { ProofRequest } from './ProofRequest'

export class CircuitInput {
  private readonly r: bigint[]
  private readonly messageDigest: bigint[]
  private readonly pathElements: bigint[]
  private readonly pathIndices: number[]
  private readonly publicKey: bigint[][]
  private readonly root: bigint
  private readonly s: bigint[]

  constructor({
    poseidon,
    proofRequest,
  }: {
    poseidon: any
    proofRequest: ProofRequest
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
    this.messageDigest = bigintToArray(64, 4, BigInt(messageDigest))
    this.pathElements = merkleProof.pathElements
    this.pathIndices = merkleProof.pathIndices
    this.publicKey = [
      bigintToArray(64, 4, BigInt(publicKey.x)),
      bigintToArray(64, 4, BigInt(publicKey.y)),
    ]
    const { r, s } = utils.splitSignature(rawSignature)
    this.r = bigintToArray(64, 4, BigInt(r))
    this.s = bigintToArray(64, 4, BigInt(s))
  }
}
