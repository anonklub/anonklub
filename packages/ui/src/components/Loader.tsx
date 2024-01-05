'use client'
import { useEffect, useState } from 'react'

export function Loader() {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 1)
      } else {
        setProgress(0)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [progress])

  return (
    <div className='flex flex-row justify-center'>
      <progress
        className='nes-progress is-success w-1/2'
        value={progress}
        max='100'
      ></progress>
    </div>
  )
}
