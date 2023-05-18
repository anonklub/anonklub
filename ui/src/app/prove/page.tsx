import Screen from '@components/Screen'

export default function ProvePage() {
  return (
    <Screen
      question='Where does your anon set lives?'
      help={[
        "Anon set: a list of addresses you want to anonymously you're part of.",
        "On chain: we'll fetch the list of addresses for you from the blockchain (using providers such as Google BigQuery, Dune Analytics or The Graph depending on the anon set type).",
        "Locally: you'll need to upload a json file containing a list of addresses you collected yourself beforehand.",
      ]}
      buttons={[
        { href: '/prove/on-chain', text: 'On chain' },
        { href: '/prove/file', text: 'Locally (file)' },
      ]}
    />
  )
}
