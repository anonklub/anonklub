import { bigintToArray, uint8ArrayToBigint } from './helpers'
import { MerkleTree } from './MerkleTree'
import { ProofRequest } from './ProofRequest'

export class CircuitInput {
  private readonly r: bigint[]
  private readonly msghash: bigint[]
  private readonly pathElements: bigint[]
  private readonly pathIndices: number[]
  private readonly pubkey: bigint[][]
  private readonly root: bigint
  private readonly s: bigint[]

  constructor({
    poseidon,
    proofRequest,
  }: {
    poseidon: any
    proofRequest: any
  }) {
    const request = ProofRequest.fromReq(proofRequest)
    const tree = new MerkleTree(request.addresses, 21, poseidon, poseidon.F)
    const merkleProof = tree.merkleProof(request.addressIndex)
    this.msghash = bigintToArray(64, 4, request.msghash)
    this.pathElements = merkleProof.pathElements
    this.pathIndices = merkleProof.pathIndices
    this.pubkey = [
      bigintToArray(64, 4, request.pubkey.x),
      bigintToArray(64, 4, request.pubkey.y),
    ]
    this.r = bigintToArray(
      64,
      4,
      uint8ArrayToBigint(request.signature.slice(0, 32)),
    )
    this.root = tree.root()
    this.s = bigintToArray(
      64,
      4,
      uint8ArrayToBigint(request.signature.slice(32, 64)),
    )
  }
}
