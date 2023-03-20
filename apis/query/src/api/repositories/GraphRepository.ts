import { Service } from 'typedi'

import {
  BeaconDepositorsDocument,
  Depositor,
  execute,
  Punk,
  PunkOwnersDocument,
  Scalars,
  Vote,
  VoteChoice,
  VotersPerProposalDocument,
} from '~/graph'

@Service()
export class GraphRepository {
  async autoPage<T, U>(
    query:
      | typeof BeaconDepositorsDocument
      | typeof PunkOwnersDocument
      | typeof VotersPerProposalDocument,
    variables: T,
    key: string,
    idFn: (arg0: U) => string,
  ): Promise<string[]> {
    let current: U[] | undefined
    let skip = 0
    const results: string[] = []

    while (current === undefined || current?.length > 0) {
      const { data } = await execute(query, { ...variables, skip })
      current = data[key]
      if (current !== undefined) {
        for (const item of current) {
          const id = idFn(item).toLowerCase()
          if (!results.includes(id)) {
            results.push(id)
          }
        }
      }

      console.log(`Fetched ${results.length} results so far...`)

      skip += 1000
    }

    return results
  }

  async getEnsProposalVoters({
    choice,
    id,
  }: {
    id: Scalars['ID']
    choice: VoteChoice
  }) {
    return this.autoPage<
      {
        id: Scalars['ID']
        choice: VoteChoice
      },
      Vote
    >(
      VotersPerProposalDocument,
      { choice, id },
      'proposal',
      (vote) => vote.voter.id,
    )
  }

  async getPunkOwners(): Promise<string[]> {
    return this.autoPage<object, Punk>(
      PunkOwnersDocument,
      {},
      'punks',
      (punk) => punk.owner.id,
    )
  }

  async getBeaconDepositors() {
    return this.autoPage<object, Depositor>(
      BeaconDepositorsDocument,
      {},
      'depositors',
      (depositor) => depositor.id,
    )
  }
}
