import { useEffect } from 'react'
import { useStore } from './useStore'

export function useSetHelp(helpText: string[]) {
  const { setHelpText } = useStore()

  useEffect(() => {
    setHelpText(helpText)
  }, [])
}
