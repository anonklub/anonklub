'use client'
import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import { useRef } from 'react'
import { modal } from '#'
import { CheckMark, Modal, ScrollableJsonContainer } from '@components'
import { useFile, useStore } from '@hooks'
import { FileType } from '@types'

const ACCEPTS = new Map([
  [FileType.ANONSET, '.json,application/json'],
  [FileType.PROOF, '.txt,text/plain'],
])

export const FileInput =
  (fileType: FileType) =>
  ({
    title,
  }: {
    title: string
  }) => {
    const { [fileType]: data } = useStore()
    const handleChange = useFile(fileType)()
    const modalRef = useRef<HTMLDialogElement>(null)
    const { open } = modal(modalRef)

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
            <CheckMark full text={title} />
          </a>
        ) : (
          <>
            <CheckMark text={title} />
            <input
              type='file'
              accept={ACCEPTS.get(fileType)}
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
