// KEEP these imports separated to avoid importing client code to the server env
import { config } from '#/config'
import { getData } from '#/get-data'
import { AnonSetResults, ErrorContainer } from '@components'

// see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// By default, next will try to pre-render and fetch the data at build time
// However, this is a dune query that is subject to query credits... sometimes the query fails. It should not prevent building the app though.
export const dynamic = 'force-dynamic'

export default async function Page() {
  try {
    const anonSet = await getData<string[]>(`${config.urls.queryApi}/beacon`)
    return <AnonSetResults anonSet={anonSet} title='Beacon depositors' />
  } catch (error) {
    if (error.cause === 'rate-limit')
      return <ErrorContainer message={error.message} />

    throw error
  }
}
