'use client'
import { useRouter } from 'next/navigation'

export const ErrorContainer = ({ message }) => {
  const router = useRouter()
  return (
    <div className='error-container'>
      <h2 className='mb-4 text-4xl font-bold'>Something went wrong!</h2>
      <p className='mb-8 text-red'>{message}</p>
      <button className='btn btn-error' onClick={() => router.back()}>
        Back
      </button>
    </div>
  )
}
