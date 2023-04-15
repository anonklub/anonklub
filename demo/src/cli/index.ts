import terminalLink from 'terminal-link'
import { ProofRequest } from '@anonset/membership'
import { API_URLS } from '../constants'
import { fetchErc20AnonSet } from '../fetch-anon-set'
import {
  AnonSetLocation,
  AnonSetType,
  askAnonSetLocation,
  askAnonSetType,
  askErc20AnonsetInputs,
  // askEthAnonsetInputs,
  askFile,
  askMessage,
  askProveOrVerify,
  askRawSignature,
  ProofAction,
} from './prompts'

export const cli = async () => {
  const proveOrVerify = await askProveOrVerify()

  switch (proveOrVerify) {
    case ProofAction.PROVE: {
      let addresses: string[] = []
      const location = await askAnonSetLocation()

      switch (location) {
        case AnonSetLocation.ONCHAIN: {
          const anonSetType = await askAnonSetType()
          switch (anonSetType) {
            case AnonSetType.ERC20_BALANCE: {
              const { min, tokenAddress } = await askErc20AnonsetInputs()
              addresses = await fetchErc20AnonSet({ min, tokenAddress })
              break
            }
            case AnonSetType.ETH_BALANCE: {
              // const { minBalance } = await askEthAnonsetInputs()
              console.log('Not Implemented')
              break
            }
            case AnonSetType.CRYPTO_PUNK: {
              console.log('Not Implemented')
              break
            }
            case AnonSetType.ENS: {
              console.log('Not Implemented')
            }
          }
          break
        }
        case AnonSetLocation.FILE: {
          const path = await askFile()
          const { default: _addresses } = await import(path)
          addresses = _addresses
        }
      }

      if (addresses.length === 0) throw new Error('No addresses list found')

      const message = await askMessage()
      const rawSignature = await askRawSignature(message)

      const proofRequest = new ProofRequest({
        addresses,
        message,
        rawSignature,
        url: API_URLS.PROVE,
      })

      const { jobId } = await proofRequest.submit()
      console.log(
        'Proof Request submitted successfully and being now processed.',
      )
      console.log(
        `Your job id is ${jobId}. Do not share this id. You'll need it to access your proof file.`,
      )
      console.log(
        `Your proof input is already available at ${terminalLink(
          'input.json',
          `${API_URLS.PROVE}/proofs/${jobId}/input.json`,
        )}`,
      )
      console.log('Wait 5-10 min and your results will be available at:')
      console.log(
        terminalLink(
          'proof.json',
          `${API_URLS.PROVE}/proofs/${jobId}/proof.json`,
        ),
      )
      console.log(
        terminalLink(
          'publicSignals.json',
          `${API_URLS.PROVE}/proofs/${jobId}/publicSignals.json`,
        ),
      )
      break
    }
    case ProofAction.VERIFY:
      console.log('Not Implemented')
  }
}
