'use client'
import { modal } from '#'
import { CheckMark } from '@/components/CheckMark'
import { Modal } from '@/components/Modal'
import { ScrollableJsonContainer } from '@/components/ScrollableJsonContainer'
import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import { useFile, useStore } from '@hooks'
import { File } from '@types'
import { useRef } from 'react'

const ACCEPTS = new Map([
  [File.ANONSET, '.json,application/json'],
  [File.PROOF, '.bin,application/octet-stream'],
])

export const FileInput = (file: File) =>
({
  title,
}: {
  title: string
}) => {
  const { [file]: data } = useStore()
  const handleChange = useFile(file)()
  const modalRef = useRef<HTMLDialogElement>(null)
  const { open } = modal(modalRef)

  const inputRef = useRef<HTMLInputElement>(null)
  const onClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className='flex w-full flex-col items-center space-y-5'>
      {data !== null
        ? (
          <>
            <button type='button' onClick={open}>
              <CheckMark full text={title} />
            </button>
            <Modal ref={modalRef}>
              <ScrollableJsonContainer data={data} />
            </Modal>
          </>
        )
        : (
          <>
            <CheckMark text={title} />
            <input
              type='file'
              accept={ACCEPTS.get(file)}
              onChange={handleChange}
              className='hidden'
              ref={inputRef}
            />
            <button type='button' className='btn btn-primary' onClick={onClick}>
              <div className='flex flex-row items-center'>
                <ArrowUpOnSquareIcon className='w-[40px]' />
              </div>
            </button>
          </>
        )}
    </div>
  )
}
