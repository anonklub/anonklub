'use client'
import { Screen } from '@components'
import { useAnonSet } from '@context/anonset'

export default function ProvePage() {
  const { resetAnonSet: onClick } = useAnonSet()
  return (
    <Screen
      question='Where is your anonset?'
      help={[
        "Anonset: a list of addresses you want to anonymously you're part of.",
        "On chain: we'll fetch the list of addresses for you from the blockchain as from the latest block (using providers such as Google BigQuery, Dune Analytics or The Graph depending on the anon set type).",
        "On a file: you'll need to upload a json file containing a list of addresses you collected yourself beforehand.",
      ]}
      buttons={[
        { href: '/prove/from-on-chain', text: 'On chain' },
        { href: '/prove/from-file', onClick, text: 'On a file' },
      ]}
    />
  )
}
