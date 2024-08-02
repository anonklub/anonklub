import { readAnonSetJsonFile, readProofBinFile } from '#'
import { File } from '@types'
import type { ChangeEvent } from 'react'
import { useStore } from './useStore'

export const useFile = (fileType: File) => () => {
  const { setAnonSet, setProof } = useStore()

  return async (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files === null
      || event.target.files === undefined
      || event.target.files.length === 0
    ) {
      return
    }

    const file = event.target.files[0]
    fileType === File.ANONSET && setAnonSet(await readAnonSetJsonFile(file))
    fileType === File.PROOF && setProof(await readProofBinFile(file))
  }
}
