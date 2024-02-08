'use client'
import { Screen } from '@components'
import { useSetHelp } from '@hooks'

export default function Page() {
  useSetHelp([
    "Prove: Generate a claim to anonymously prove you're a member of a list of addresses.",
    'Verify: Check an already generated membership claim.',
  ])

  return (
    <Screen
      question='What do you want to do?'
      buttons={[
        { href: '/prove', text: 'Prove' },
        { href: '/verify', text: 'Verify' },
      ]}
    />
  )
}
