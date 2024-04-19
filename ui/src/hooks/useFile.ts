import type { ChangeEvent } from 'react'
import { readAnonSetJsonFile, readProofTxtFile } from '#'
import { FileType } from '@types'
import { useStore } from './useStore'

export const useFile = (fileType: FileType) => () => {
  const { setAnonSet, setProof } = useStore()

  return async (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files === null ||
      event.target.files === undefined ||
      event.target.files.length === 0
    )
      return

    const file = event.target.files[0]
    fileType === FileType.ANONSET && setAnonSet(await readAnonSetJsonFile(file))
    fileType === FileType.PROOF && setProof(await readProofTxtFile(file))
  }
}

export const useAnonSetJsonFile = useFile(FileType.ANONSET)
export const useProofTxtFile = useFile(FileType.PROOF)
