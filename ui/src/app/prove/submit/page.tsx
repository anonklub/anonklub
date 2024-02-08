import { SubmitProofRequest } from '@components'
import { useSetHelp } from '@hooks'

export default function Page() {
  useSetHelp([
    'Sign a message with the address you want to prove is part on the anonset. This signature and the anonset are required to build your zk proof.',
  ])
  return <SubmitProofRequest />
}
