import { ChangeEvent } from 'react'
import { readJsonFile } from '#/read-json-file'
import { StoreModel } from '@/store'
import { useStore } from '@hooks'

export const useJsonFile = (key: keyof StoreModel) => {
  const [, setData] = useStore(key)
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== undefined && event.target.files !== null) {
      const parsedData = await readJsonFile(event.target.files[0])

      setData(parsedData)
    }
  }

  return { handleChange }
}
