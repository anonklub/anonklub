import { useStore } from '@/hooks/useStore'
import { useEffect } from 'react'

export function useSetHelp(helpText: string[]) {
  const { setHelpText } = useStore()

  useEffect(() => {
    setHelpText(helpText)
  }, [])
}
