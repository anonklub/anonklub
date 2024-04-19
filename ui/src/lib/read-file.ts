import { parse } from './parse'
import { FileType } from './types'

function ReadFile(fileType: FileType.ANONSET): (file: Blob) => Promise<string[]>
function ReadFile(fileType: FileType.PROOF): (file: Blob) => Promise<Uint8Array>
function ReadFile(fileType: FileType) {
  return (file: Blob): Promise<Uint8Array | string[]> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onload = (event) => {
        const proofFile = event.target?.result
        if (proofFile === null || proofFile === undefined) {
          reject(new Error('File is empty'))
        } else {
          resolve(parse(proofFile))
        }
      }

      fileReader.onerror = (error) => reject(error)
      fileReader[
        fileType === FileType.ANONSET ? 'readAsText' : 'readAsArrayBuffer'
      ](file)
    })
  }
}

export const readAnonSetJsonFile = ReadFile(FileType.ANONSET)
export const readProofTxtFile = ReadFile(FileType.PROOF)
