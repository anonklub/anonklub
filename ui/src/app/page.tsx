import { Screen } from '@components'

export default function Page() {
  return (
    <Screen
      question='What do you want to do?'
      help={[
        "Prove: Generate a claim to anonymously prove you're a member of a list of addresses.",
        'Verify: Check an already generated membership claim.',
      ]}
      buttons={[
        { href: '/prove', text: 'Prove' },
        { href: '/verify', text: 'Verify' },
      ]}
    />
  )
}
