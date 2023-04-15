import {
  AnonSetLocation,
  AnonSetType,
  askAnonSetLocation,
  askAnonSetType,
  askErc20AnonsetInputs,
  askMessage,
  askProveOrVerify,
  ProofAction,
} from './prompts'
import { askRawSignature } from './prompts/ask-raw-signature'

const cli = async () => {
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
              const { erc20Address, minBalance } = await askErc20AnonsetInputs()
              console.log('fetch anonset', erc20Address, minBalance)
              addresses = ['0x123', '0x456']
            }
          }
          break
        }
        case AnonSetLocation.FILE:
          console.log('file')
      }

      const rawSignature = await askRawSignature()
      const message = await askMessage()

      console.log('prove', { addresses, message, rawSignature })
      break
    }
    case ProofAction.VERIFY:
      console.log('Verify')
  }
}

cli()
  .then(() => console.log('done'))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
