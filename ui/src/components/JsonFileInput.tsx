import { readJsonFile } from '#/read-json-file'

export function JsonFileInput() {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== undefined && event.target.files !== null) {
      const parsedData = await readJsonFile(event.target.files[0])

      console.log(parsedData)
    }
  }

  return (
    <input type='file' accept='.json,application/json' onChange={onChange} />
  )
}
