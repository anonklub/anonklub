export async function readJsonFile(
	file: Blob,
	key: 'proof' | 'anonSet',
): Promise<string[] | Uint8Array> {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()

		fileReader.onload = (event) => {
			if (event.target !== undefined && event.target !== null) {
				const fileResults = event.target.result

				if (key === 'proof' && fileResults != null) {
					const array = (fileResults as string).split(',').map(Number)
					const proof = new Uint8Array(array)
					resolve(proof)
				} else {
					resolve(JSON.parse(fileResults as string))
				}
			}
			// TODO: should we throw error in this case of empty file ?
		}

		fileReader.onerror = (error) => reject(error)
		fileReader.readAsText(file)
	})
}
