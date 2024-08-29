import { useStore } from '@/hooks/useStore'

export const useHelp = () => {
  const { helpText, setHelpText } = useStore()
  return {
    helpText,
    setHelpText,
  }
}
