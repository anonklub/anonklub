'use client'
import { useState } from 'react'
import { Loader } from '@components'
import { useProofResult } from '@hooks'

// TODO: extract in /lib
const ellipsify = (text: string, start = 6): string => {
  if (text.length <= start) {
    return text
  }

  return `${text.slice(0, start)}... +${text.length - start}`
}

export default function Page() {
  const state = useProofResult()
  const fullProof = state.value
  const [copySuccess, setCopySuccess] = useState('')

  if (fullProof == null) return <Loader />

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(fullProof.toString())
      .then(() => setCopySuccess('Copied!'))
      .catch(() => setCopySuccess('Failed to copy'))
  }

  const downloadTextFile = () => {
    const element = document.createElement('a')
    const file = new Blob([fullProof.toString()], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'fullProof.txt'
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div className='mt-[70px] flex flex-col items-center justify-center'>
      <h2 className='header'>Proof Results</h2>

      <div className='text-grey'>{ellipsify(fullProof.toString(), 100)}</div>
      {copySuccess}
      <div className='buttons-row'>
        <button onClick={copyToClipboard} className='btn btn-primary'>
          Copy to Clipboard
        </button>
        <button onClick={downloadTextFile} className='btn btn-primary'>
          Download as Text File
        </button>
      </div>
    </div>
  )
}
