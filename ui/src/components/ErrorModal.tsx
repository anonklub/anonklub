'use client'
import { useEffect, useRef } from 'react'
import { modal } from '#'
import { Text } from '@components'
import { useStore } from '@hooks'
import Link from 'next/link'

export const ErrorModal = ({ content }: { content: string[] }) => {
  const ref = useRef<HTMLDialogElement>(null)
  const { close, open } = modal(ref)
  const { setErrorWasRead } = useStore()

  return (
    <div
      className='bg-gray-600 fixed inset-0 h-full w-full overflow-y-auto bg-opacity-50'
      onClick={close}
    >
      <div className='bg-white relative top-20 mx-auto w-96 rounded-md border p-5 shadow-lg'>
        <div className='flex items-center justify-between'>
          <h3 className='text-gray-900 text-lg font-medium leading-6'>Error</h3>
          <button
            type='button'
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 ml-auto inline-flex items-center rounded-lg p-1.5 text-sm'
            onClick={close}
          >
            <svg
              className='h-5 w-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
        <div className='mt-2'>
          <p className='text-gray-500 text-sm'>
            {content.map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className='mt-4 flex justify-center'>
          <button
            type='button'
            className='border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
            onClick={() => {
              setErrorWasRead(true)
              close()
            }}
          >
            <Link href='/' className='text-white no-underline'>
              OK
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
