'use client'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (loading) {
        if (progress < 100) {
          setProgress(progress + 1)
        } else {
          setProgress(0)
        }
      }
    }, 25)

    return () => clearInterval(interval)
  }, [progress, loading])

  return (
    <div className='flex flex-col items-center space-y-3'>
      <button
        type='button'
        className={`nes-btn ${loading ? 'is-warning' : 'is-primary'}`}
        onClick={() => {
          setLoading(!loading)
          setProgress(0)
        }}
      >
        {loading ? 'Abort' : 'Fetch'}
      </button>
      <progress
        className='nes-progress is-success'
        value={progress}
        max='100'
      ></progress>
    </div>
  )
}
