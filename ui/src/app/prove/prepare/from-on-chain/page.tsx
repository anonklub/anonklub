'use client'
import { Screen } from '@components'
import { useResetAnonSet, useSetHelp } from '@hooks'

export default function ChooseAnonSetTypePage() {
  useSetHelp([
    'Asset: are you a member of the group of people who own some ETH, ERC20, NFTs...?',
    'Beacon: are you a member of the group of addresses who have deposited ETH in the Ethereum 2.0 beacon contract (0x00000000219ab540356cbb839cbe05303d7705fa)?',
    'DAO: are you a member of the group of people involved in a DAO governance?',
  ])
  useResetAnonSet()

  return (
    <Screen
      question='What type of membership do you want to prove?'
      buttons={[
        { href: '/prove/prepare/from-on-chain/asset', text: 'Asset' },
        { href: '/query/beacon', text: 'Beacon' },
        { href: '/prove/prepare/from-on-chain/dao', text: 'DAO' },
      ]}
    />
  )
}
