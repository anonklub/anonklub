import { ProofRequest } from '@anonset/membership'
import { API_URLS } from '../constants'
import { fetchErc20AnonSet } from '../fetch-anon-set'
import { logResult } from './log-result'
import {
  AnonSetLocation,
  AnonSetType,
  askAnonSetLocation,
  askAnonSetType,
  askErc20AnonsetInputs,
  // askEthAnonsetInputs,
  askAddressesFile,
  askProofFile,
  askPublicSignalsFile,
  askMessage,
  askProveOrVerify,
  askRawSignature,
  ProofAction,
  askVerificationKeyFile,
} from './prompts'
import { execSync } from 'child_process'

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
