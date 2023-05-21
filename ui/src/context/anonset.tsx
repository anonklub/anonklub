import { createContext, FC, ReactNode, useContext, useState } from 'react'

interface AnonSetContextType {
  anonSet: string[]
  setAnonSet: (anonSet: string[]) => void
  resetAnonSet: () => void
}

const AnonSetContext = createContext<AnonSetContextType | null>(null)

export const useAnonSet = () => {
  const context = useContext(AnonSetContext)

  if (context === null)
    throw new Error('useAnonSet must be used within a AnonSetProvider')

  return context
}

export const AnonSetProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [anonSet, setAnonSet] = useState<string[]>([])
  const resetAnonSet = () => {
    setAnonSet([])
  }

  return (
    <AnonSetContext.Provider value={{ anonSet, resetAnonSet, setAnonSet }}>
      {children}
    </AnonSetContext.Provider>
  )
}
