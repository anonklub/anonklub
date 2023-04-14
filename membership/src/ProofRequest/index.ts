import { Point } from '@noble/secp256k1'
import { utils } from 'ethers'
import { Proof, ProofRequestArgs, ProofRequestInterface } from './interface'

export class ProofRequest implements ProofRequestInterface {
  public readonly addresses: string[]
  public readonly messageDigest: string
  public readonly publicKey: { x: string; y: string }
  public readonly rawSignature: string
  public jobId: string | undefined
  public readonly url: string

  constructor({ addresses, message, rawSignature, url }: ProofRequestArgs) {
    this.addresses = addresses
    this.rawSignature = rawSignature
    this.url = url

    const publicKey = Point.fromHex(
      utils.recoverPublicKey(utils.hashMessage(message), rawSignature).slice(2),
    )
    this.publicKey = { x: publicKey.x.toString(), y: publicKey.y.toString() }
    this.messageDigest = utils.hashMessage(message)
  }

  async submit(): Promise<void> {
    this.jobId = await fetch(this.url, {
      body: this.serialize(),
      method: 'POST',
    }).then(async (res) => res.text())
  }

  async getResult(): Promise<Proof> {
    if (this.jobId === undefined) throw new Error('Job not submitted yet')

    const [proof, publicSignals] = await Promise.all(
      ['proof', 'publicSignals'].map(async (key) =>
        fetch(`${this.url}/${this.jobId}/${key}.json`).then(async (res) =>
          res.json(),
        ),
      ),
    )
    return { proof, publicSignals }
  }

  serialize(): string {
    const { jobId, ...rest } = this
    return JSON.stringify(rest)
  }
}
