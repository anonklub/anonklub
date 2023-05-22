export async function readJsonFile(file: Blob): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = (event) => {
      if (event.target !== undefined && event.target !== null)
        resolve(JSON.parse(event.target.result as string))
    }

    fileReader.onerror = (error) => reject(error)
    fileReader.readAsText(file)
  })
}
