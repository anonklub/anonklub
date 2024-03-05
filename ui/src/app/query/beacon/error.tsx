'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='error-container'>
      <h2 className='mb-4 text-4xl font-bold'>Something went wrong!</h2>
      <p className='mb-8 text-red'>{error.message}</p>
      <button
        className='focus:shadow-outline transform rounded bg-red px-4 py-2 font-bold text-grey transition-colors duration-150 hover:bg-grey hover:text-red focus:outline-none'
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  )
}
