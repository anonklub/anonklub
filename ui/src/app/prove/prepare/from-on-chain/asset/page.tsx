'use client'
import { Screen } from '@components'
import { useResetAnonSet } from '@hooks'

export default function ChooseAnonSetAssetPage() {
  useResetAnonSet()

  return (
    <Screen
      question='What type of asset do you want to prove you own?'
      help={[
        'NFT: are you a member of the group of people who own an NFT of a given collection?',
        'ERC20: are you a member of the group of people who own a min amount of a given ERC20 token?',
      ]}
      buttons={[
        { href: '/prove/prepare/from-on-chain/asset/nft', text: 'NFT' },
        { href: '/query/asset/erc20', text: 'ERC20' },
      ]}
    />
  )
}
