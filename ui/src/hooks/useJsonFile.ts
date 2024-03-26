import { ActionCreator } from 'easy-peasy'
import { ChangeEvent } from 'react'
import { readJsonFile } from '#'
import { useStoreActions } from '@hooks'

/**
 * Hook to read a JSON file and set the data in the store.
 * @param key from 'anonSet', 'proof'
 */
export const useJsonFile = (key: 'proof' | 'anonSet') => {
	const setData = useStoreActions((actions) => actions[key].set)

	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== undefined && event.target.files !== null) {
			const file = event.target.files[0]

			const parsedData = await readJsonFile(file, key)
			if (Array.isArray(parsedData)) {
				;(setData as ActionCreator<string[]>)(parsedData)
			} else {
				;(setData as ActionCreator<Uint8Array>)(parsedData)
			}
		}
	}

	return { handleChange }
}
