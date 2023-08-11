import { DistinctQuestion, QuestionCollection } from 'inquirer'
import {
  EnsProposalVotersRequest,
  Erc20BalanceAnonSetRequest,
  EthBalanceAnonSetRequest,
  Request,
} from '@anonklub/query'
import { AnonSetLocation, AnonSetType, ProofAction } from '../types'

export interface PromptI {
  askAnonSetLocation: () => Promise<AnonSetLocation>
  askAnonSetType: () => Promise<AnonSetType>
  askErc20AnonSetInputs: (
    anonSetType: AnonSetType,
  ) => Promise<Request<Erc20BalanceAnonSetRequest>>
  askEthAnonSetInput: () => Promise<Request<EthBalanceAnonSetRequest>>
  askEnsAnonSetInputs: () => Promise<Request<EnsProposalVotersRequest>>
  askFile: (fileName: string) => () => Promise<string>
  askAddressesFile: () => Promise<string>
  askProofFile: () => Promise<string>
  askProveOrVerify: () => Promise<ProofAction>
  askPublicSignalsFile: () => Promise<string>
  askVerificationKeyFile: () => Promise<string>
  prompt: <T>(
    questions: QuestionCollection | DistinctQuestion,
  ) => () => Promise<T>
}
