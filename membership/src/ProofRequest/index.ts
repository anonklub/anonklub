import {
  JobResponse,
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
    // TODO: validate params
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

  async submit() {
    const jobResponse = (await fetch(`${this.url}/proof`, {
      body: this.serialize(),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }).then(async (res) => res.json())) as JobResponse

    this.jobId = jobResponse.jobId

    return jobResponse
  }

  async getResult(): Promise<ProofResult> {
    if (this.jobId === undefined) throw new Error('Job not submitted yet')

    const [proof, publicSignals] = await Promise.all(
      ['proof', 'public'].map(async (key) =>
        fetch(`${this.url}/${this.jobId}/${key}.json`).then(async (res) =>
          res.json(),
        ),
      ),
    )
    return { proof, publicSignals }
  }
}
