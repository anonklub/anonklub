'use client'
import { Screen } from '@components'
import { useStore } from '@hooks'

export default function ChooseAnonSetTypePage() {
  const { resetAnonSet: onClick } = useStore()

  return (
    <Screen
      question='What type of membership do you want to prove?'
      help={[
        'Cryptopunk: are you a member of the group of people who own a cryptopunk?',
        'ENS Voters: are you a member of the group of people who voted on a specific ENS proposal.',
        'ETH balance: are you a member of the group of people who own a min amount of ETH?',
        'ERC20 balance: are you a member of the group of people who own a min amount of a given ERC20 token?',
      ]}
      buttons={[
        {
          href: '/query/cryptopunk',
          onClick,
          text: 'Cryptopunk',
        },
        { href: '/query/ens', onClick, text: 'ENS Voters' },
        {
          href: '/query/eth-balance',
          onClick,
          text: 'ETH balance',
        },
        {
          href: '/query/erc20-balance',
          onClick,
          text: 'ERC20 balance',
        },
      ]}
    />
  )
}
