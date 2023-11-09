'use client'
import { Screen } from '@components'
import { useResetAnonSet } from '@hooks'

export default function ChooseAnonSetTypePage() {
    useResetAnonSet()

  return (
    <Screen
      question='What type of membership do you want to prove?'
      help={[
        'Asset: are you a member of the group of people who own some ETH, ERC20, NFTs...?',
        'DAO: are you a member of the group of people involved in a DAO governance?',
      ]}
      buttons={[
        { href: '/prove/prepare/from-on-chain/asset', text: 'Asset' },
        { href: '/prove/prepare/from-on-chain/dao', text: 'DAO' },
      ]}
    />
  )
}
