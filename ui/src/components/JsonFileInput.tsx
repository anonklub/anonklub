'use client'
import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import { useRef } from 'react'
import { StoreModel } from '@/store'
import { Modal, ScrollableJsonContainer, Star } from '@components'
import { useJsonFile, useModal, useStore } from '@hooks'

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | JSONValue[]

export function JsonFileInput({
  dataKey,
  title,
}: {
  dataKey: keyof StoreModel
  title: string
}) {
  const { [dataKey]: data } = useStore()
  const { handleChange } = useJsonFile(dataKey)
  const modalRef = useRef<HTMLDialogElement>(null)
  const { open } = useModal(modalRef)

  const inputRef = useRef<HTMLInputElement>(null)
  const onClick = () => {
    inputRef.current?.click()
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
            onChange={handleChange}
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
