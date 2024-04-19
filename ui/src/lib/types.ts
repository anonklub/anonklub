export enum FileType {
  PROOF = 'proof',
  ANONSET = 'anonSet',
}

export type ParsedFileType<T> = T extends FileType.ANONSET
  ? string[]
  : Uint8Array

export type JsonValue =
  | string
  | number
  | boolean
  | { [x: string]: JsonValue }
  | JsonValue[]
