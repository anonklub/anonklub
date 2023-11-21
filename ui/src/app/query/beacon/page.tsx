// KEEP these imports separated to avoid importing client code to the server env
import { config } from '#/config'
import { getData } from '#/get-data'
import { AnonSetResults } from '@components'

export default async function Page() {
  const anonSet = await getData<string[]>(`${config.urls.queryApi}/beacon`)

  return <AnonSetResults anonSet={anonSet} title='Beacon depositors' />
}
