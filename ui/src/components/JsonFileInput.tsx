'use client'
import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import { ChangeEvent, useRef, useState } from 'react'
import { readJsonFile } from '#/read-json-file'
import { Modal, Star } from '@components'
import { ScrollableJsonContainer } from '@components/ScrollableJsonContainer'
import { useModal } from '@hooks'

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
  const modalRef = useRef<HTMLDialogElement>(null)
  const { open } = useModal(modalRef)

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

  return (
    <div className='flex w-full flex-col items-center space-y-5'>
      {data !== null ? (
        <a onClick={open}>
          <Modal ref={modalRef}>
            <ScrollableJsonContainer data={data} />
          </Modal>
          <Star full text={title} />
        </a>
      ) : (
        <>
          <Star text={title} />
          <input
            type='file'
            accept='.json,application/json'
            onChange={onChange}
            className='hidden'
            ref={inputRef}
          />
          <button
            type='button'
            className='nes-btn is-warning self-center'
            onClick={onClick}
          >
            <div className='flex flex-row items-center'>
              <ArrowUpOnSquareIcon className='w-[40px]' />
            </div>
          </button>
        </>
      )}
    </div>
  )
}
