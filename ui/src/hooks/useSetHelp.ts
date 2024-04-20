import { useEffect } from 'react'
import { useStore } from '@hooks'

export function useSetHelp(helpText: string[]) {
  const { setHelpText } = useStore()

  useEffect(() => {
    setHelpText(helpText)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
