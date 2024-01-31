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

    // FIXME
    /* @ts-expect-error */
    const proofRequest = new ProofRequest({
      addresses: this.anonSetResponse.data,
      message,
      rawSignature,
    })

    console.log('TODO')
    console.log({ proofRequest })
  }

  async verify() {
    const proofPath = await this.prompt.askProofFile()
    console.log('TODO')
    console.log({ proofPath })
  }
}

export const cli = new Cli({
  anonSet: new AnonymitySet(),
  prompt: new Prompt(),
})
