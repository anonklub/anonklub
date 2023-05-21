import { useRef } from 'react'
import { readJsonFile } from '#/read-json-file'
import { ScrollableContainer } from '@components/ScrollableContainer'
import { useAnonSet } from '@context/anonset'

export function AnonSetFileInput() {
  const { anonSet, setAnonSet } = useAnonSet()
  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    inputRef.current?.click()
  }

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== undefined && event.target.files !== null) {
      const parsedData = await readJsonFile(event.target.files[0])

      setAnonSet(parsedData)
    }
  }

  return anonSet.length === 0 ? (
    <>
      <input
        type='file'
        accept='.json,application/json'
        onChange={onChange}
        className='hidden'
        ref={inputRef}
      />
      <button
        type='button'
        className='nes-btn is-warning w-1/4 self-center'
        onClick={onClick}
      >
        Upload file
      </button>
    </>
  ) : (
    <ScrollableContainer data={anonSet} />
  )
}
