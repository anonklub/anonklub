import { execSync } from 'child_process'
import terminalLink from 'terminal-link'
import { ProofRequest } from '@anonklub/proof'
import { AnonSetResponse, AnonymitySet } from '@anonklub/query'
import { Prompt } from '../Prompt/index.js'
import { AnonSetLocation, AnonSetType, ProofAction } from '../types.js'
import { CliI } from './interface'

class Cli implements CliI {
  anonSet: AnonymitySet
  prompt: Prompt
  anonSetResponse: AnonSetResponse | undefined

  constructor({ anonSet: AnonymitySet, prompt: Prompt }) {
    this.anonSet = AnonymitySet
    this.prompt = Prompt
  }

  async run() {
    const proveOrVerify = await this.prompt.askProveOrVerify()

    if (proveOrVerify === ProofAction.PROVE) {
      await this.prove()
    } else if (proveOrVerify === ProofAction.VERIFY) {
      await this.verify()
    }
  }

  async prove() {
    const location = await this.prompt.askAnonSetLocation()

    if (location === AnonSetLocation.ONCHAIN) {
      const anonSetType = await this.prompt.askAnonSetType()
      if (anonSetType === AnonSetType.ERC20_BALANCE) {
        const { min, tokenAddress } = await this.prompt.askErc20AnonSetInputs()
        this.anonSetResponse = await this.anonSet.fromErc20Balance({
          min,
          tokenAddress,
        })
      } else if (anonSetType === AnonSetType.ETH_BALANCE) {
        const { min } = await this.prompt.askEthAnonSetInput()
        this.anonSetResponse = await this.anonSet.fromEthBalance({ min })
      } else if (anonSetType === AnonSetType.CRYPTO_PUNK) {
        this.anonSetResponse = await this.anonSet.fromCryptoPunkOwners()
      } else if (anonSetType === AnonSetType.ENS) {
        const { choice, id } = await this.prompt.askEnsAnonSetInputs()
        this.anonSetResponse = await this.anonSet.fromEnsProposalVoters({
          choice,
          id,
        })
      }
    } else {
      const path = await this.prompt.askAddressesFile()
      const { default: addresses } = await import(path)
      this.anonSetResponse = { data: addresses }
    }

    if (
      this.anonSetResponse === undefined ||
      this.anonSetResponse?.data?.length === 0
    )
      throw new Error('No addresses found')
    if (this.anonSetResponse?.error !== undefined)
      throw this.anonSetResponse.error

    const message = await this.prompt.askMessage()
    const rawSignature = await this.prompt.askRawSignature(message)

    const proofRequest = new ProofRequest({
      addresses: this.anonSetResponse.data,
      message,
      rawSignature,
      url: 'http://anonklub.xyz:3000', // TODO: make this configurable
    })

    const { jobId } = await proofRequest.submit()
    this.logProofRequestResult(jobId)
  }

  async verify() {
    const proofPath = await this.prompt.askProofFile()
    const publicSignalsPath = await this.prompt.askPublicSignalsFile()
    const verificationKeyPath = await this.prompt.askVerificationKeyFile()

    // TODO: use groth16 module from snarkjs directly instead
    const result = execSync(
      `snarkjs groth16 verify ${verificationKeyPath} ${publicSignalsPath} ${proofPath}`,
    )
    console.log(result.toString())
  }

  logProofRequestResult(jobId: string) {
    console.log('Proof Request submitted successfully and being now processed.')
    console.log(
      `Your job id is ${jobId}. Do not share this id. You'll need it to access your proof file.`,
    )
    console.log(
      `Your proof input is already available at ${terminalLink(
        'input.json',
        `/proofs/${jobId}/input.json`, // TODO: prepend Proof API URL
      )}`,
    )
    console.log('Wait 5-10 min and your results will be available at:')
    console.log(
      terminalLink('proof.json', `/proofs/${jobId}/proof.json`), // // TODO: prepend Proof API URL
    )
    console.log(
      terminalLink(
        'publicSignals.json',
        `/proofs/${jobId}/publicSignals.json`, // TODO: prepend Proof API URL
      ),
    )
  }
}

export const cli = new Cli({
  anonSet: new AnonymitySet(),
  prompt: new Prompt(),
})
