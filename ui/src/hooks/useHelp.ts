import { useStore } from './useStore'

export const useHelp = () => {
  const { helpText, setHelpText } = useStore()
  return {
    helpText,
    setHelpText,
  }
}
