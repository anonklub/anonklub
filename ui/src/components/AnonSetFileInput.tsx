'use client'
import { JsonFileInput } from '@components/JsonFileInput'
import { useAnonSet } from '@context/anonset'

export function AnonSetFileInput() {
  const { setAnonSet } = useAnonSet()
  return <JsonFileInput setData={setAnonSet} title='Anonset' />
}
