import { useEffect, useState } from 'react'

export default function useReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return ready
}
