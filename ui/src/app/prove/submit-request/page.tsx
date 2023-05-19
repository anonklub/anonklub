import { SubmitProofRequest } from '@components'

export default function Page({ searchParams: { anonSet } }) {
  return <SubmitProofRequest anonSet={anonSet} />
}
