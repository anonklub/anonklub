import Screen from '@components/Screen'

export default () => (
  <Screen
    question='What type of membership do you want to prove?'
    help={[
      'Cryptopunk: are you a member of the group of people who own a cryptopunk?',
      'ENS Proposal Voters: are you a member of the group of people who voted on a specific ENS proposal.',
      'ETH balance: are you a member of the group of people who own a min amount of ETH?',
      'ERC20 balance: are you a member of the group of people who own a min amount of a given ERC20 token?',
    ]}
    buttons={[
      { href: '/query/cryptopunk', text: 'Cryptopunk' },
      { href: '/query/ens', text: 'ENS Proposal Voters' },
      { href: '/query/eth-balance', text: 'ETH balance' },
      { href: '/query/erc20-balance', text: 'ERC20 balance' },
    ]}
  />
)
