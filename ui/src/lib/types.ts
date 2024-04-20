export enum File {
  PROOF = 'proof',
  ANONSET = 'anonSet',
}

export type ParsedFile<T> = T extends File.ANONSET ? string[] : Uint8Array

export type JsonValue =
  | string
  | number
  | boolean
  | { [x: string]: JsonValue }
  | JsonValue[]
