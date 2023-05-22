import { execSync } from 'child_process'
import { ProofRequest } from '@anonset/membership'
import { API_URLS } from '../constants'
import {
  fetchEnsVotersAnonSet,
  fetchErc20AnonSet,
  fetchEthAnonSet,
  fetchPunksAnonSet,
} from '../fetch-anonset'
import { logResult } from './log-result'
import {
  AnonSetLocation,
  AnonSetType,
  askAddressesFile,
  askAnonSetLocation,
  askAnonSetType,
  askEnsAnonsetInputs,
  askErc20AnonsetInputs,
  askEthAnonsetInputs,
  askMessage,
  askProofFile,
  askProveOrVerify,
  askPublicSignalsFile,
  askRawSignature,
  askVerificationKeyFile,
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
              const { minBalance } = await askEthAnonsetInputs()
              addresses = await fetchEthAnonSet({ minBalance })
              break
            }
            case AnonSetType.CRYPTO_PUNK: {
              addresses = await fetchPunksAnonSet()
              break
            }
            case AnonSetType.ENS: {
              const { choice, id } = await askEnsAnonsetInputs()
              addresses = await fetchEnsVotersAnonSet({ choice, id })
            }
          }
          break
        }

        case AnonSetLocation.FILE: {
          const path = await askAddressesFile()
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
      logResult(jobId)

      break
    }
    case ProofAction.VERIFY: {
      const proofPath = await askProofFile()
      const publicSignalsPath = await askPublicSignalsFile()
      const verificationKeyPath = await askVerificationKeyFile()

      const result = execSync(
        `snarkjs groth16 verify ${verificationKeyPath} ${publicSignalsPath} ${proofPath}`,
      )
      console.log(result.toString())
    }
  }
}
