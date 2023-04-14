import {
  ProofRequestArgs,
  ProofRequestInterface,
  ProofRequestJson,
  ProofResult,
} from './interface'

export class ProofRequest implements ProofRequestInterface {
  public readonly addresses: string[]
  public readonly message: string
  public readonly rawSignature: string
  public jobId: string | undefined
  public readonly url: string

  constructor({ addresses, message, rawSignature, url }: ProofRequestArgs) {
    this.addresses = addresses
    this.message = message
    this.rawSignature = rawSignature
    this.url = url
  }

  private toJSON(): ProofRequestJson {
    const { jobId, url, ...rest } = this
    return rest
  }

  private serialize() {
    return JSON.stringify(this.toJSON())
  }

  async submit(): Promise<void> {
    this.jobId = await fetch(this.url, {
      body: this.serialize(),
      method: 'POST',
    }).then(async (res) => res.text())
  }

  async getResult(): Promise<ProofResult> {
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
}
