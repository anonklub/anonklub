import { config, getData } from '#'
import { AnonSetResults } from '@components/AnonSetResults'

export default async function Page() {
  const anonSet = await getData<string[]>(`${config.urls.queryApi}/punks`)

  return <AnonSetResults anonSet={anonSet} title='Cryptopunk' />
}
