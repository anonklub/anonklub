'use client'
import { useState } from 'react'
import { Loader } from '@components'
import { useProofResult } from '@hooks'

const ellipsify = (text: string, start = 6): string => {
  if (text.length <= start) {
    return text
  }

  return `${text.slice(0, start)}... +${text.length - start}`
}

export default function Page() {
  const { fullProof } = useProofResult()
  const [copySuccess, setCopySuccess] = useState('')

  if (fullProof == null) {
    return <Loader />
  }

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
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  return (
    <div className='flex flex-col items-center justify-center space-y-10'>
      <h2 className='self-start'>Proof Results</h2>

      <div className='flex flex-col text-red'>
        {ellipsify(fullProof.toString(), 100)}
      </div>
      {copySuccess}
      <div className='flex flex-row justify-center space-x-5'>
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
