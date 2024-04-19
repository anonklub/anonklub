import { useStore } from '@hooks'

export const useHelp = () => {
  const { helpText, setHelpText } = useStore()
  return {
    helpText,
    setHelpText,
  }
}
