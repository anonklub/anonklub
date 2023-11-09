'use client'
import { Screen } from '@components'
import { useResetAnonSet } from '@hooks'

export default function ChooseAnonSetDaoPage() {
  useResetAnonSet()

  return (
    <Screen
      question='Which DAO do you want to prove you participated in the governance of?'
      help={[
        'ENS: are you a member of the group of people who voted on a specific ENS proposal.',
      ]}
      buttons={[
        { href: '/query/ens', text: 'ENS' },
      ]}
    />
  )
}
