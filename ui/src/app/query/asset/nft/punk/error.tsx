'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='bg-gray flex min-h-screen flex-col items-center justify-start pt-32 text-center text-red'>
      <h2 className='mb-4 text-4xl font-bold'>Something went wrong!</h2>
      <p className='mb-8 text-red'>{error.message}</p>
      <button
        className='focus:shadow-outline transform rounded bg-red px-4 py-2 font-bold text-grey transition-colors duration-150 hover:bg-grey hover:text-red focus:outline-none'
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
