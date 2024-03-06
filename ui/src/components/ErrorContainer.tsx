'use client'
import { useGoBackOnClickOutside } from '@hooks'

export const ErrorContainer = ({ message }) => {
  const goBack = useGoBackOnClickOutside()

  return (
    <div className='error-container'>
      <h2 className='mb-4 text-4xl font-bold'>Something went wrong!</h2>
      <p className='mb-8 text-red'>{message}</p>
      <button className='btn btn-error' onClick={goBack}>
        Back
      </button>
    </div>
  )
}
