import { ChangeEvent } from 'react'
import { readJsonFile } from '#'
import { StoreModel } from '@/store'
import { useStoreActions } from '@hooks'

/**
 * Hook to read a JSON file and set the data in the store.
 * @param key from 'anonSet', 'proof', 'publicSignals'
 */
export const useJsonFile = (key: keyof StoreModel) => {
  const setData = useStoreActions((actions) => actions[key].set)
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== undefined && event.target.files !== null) {
      const parsedData = await readJsonFile(event.target.files[0])

      setData(parsedData)
    }
  }

  return { handleChange }
}
