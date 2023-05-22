'use client'
import { ChangeEvent, useRef, useState } from 'react'
import { readJsonFile } from '#/read-json-file'
import { ScrollableJsonContainer } from '@components/ScrollableJsonContainer'

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | JSONValue[]

export function JsonFileInput({
  setData,
  title,
}: {
  setData: (data: JSONValue) => void
  title: string
}) {
  const [data, _setData] = useState<JSONValue | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    inputRef.current?.click()
  }

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== undefined && event.target.files !== null) {
      const parsedData = await readJsonFile(event.target.files[0])

      _setData(parsedData)
      setData(parsedData)
    }
  }

  return data === null ? (
    <>
      <input
        type='file'
        accept='.json,application/json'
        onChange={onChange}
        className='hidden'
        ref={inputRef}
      />
      <button
        type='button'
        className='nes-btn is-warning w-1/4 self-center'
        onClick={onClick}
      >
        {title}
      </button>
    </>
  ) : (
    <ScrollableJsonContainer data={data} />
  )
}
