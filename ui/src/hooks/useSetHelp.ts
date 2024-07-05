import { useStore } from '@hooks'
import { useEffect } from 'react'

export function useSetHelp(helpText: string[]) {
  const { setHelpText } = useStore()

  useEffect(() => {
    setHelpText(helpText)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
