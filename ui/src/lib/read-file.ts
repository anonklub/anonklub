import { parse } from './parse'
import { File } from './types'

function ReadFile(fileType: File.ANONSET): (file: Blob) => Promise<string[]>
function ReadFile(fileType: File.PROOF): (file: Blob) => Promise<Uint8Array>
function ReadFile(fileType: File) {
  return (file: Blob): Promise<Uint8Array | string[]> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onload = (event) => {
        const proofFile = event.target?.result
        if (proofFile === null || proofFile === undefined)
          reject(new Error('File is empty'))
        else
          resolve(parse(proofFile))
      }

      fileReader.onerror = (error) => reject(error)
      fileReader[
        fileType === File.ANONSET ? 'readAsText' : 'readAsArrayBuffer'
      ](file)
    })
  }
}

export const readAnonSetJsonFile = ReadFile(File.ANONSET)
export const readProofBinFile = ReadFile(File.PROOF)
