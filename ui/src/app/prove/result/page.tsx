'use client'
import { Loader } from '@components'
import { useCopyToClipboard, useProofResult } from '@hooks'
import { ellipsify } from '#'

// TODO: extract in /lib
export default function Page() {
  const { copyToClipboard, copySuccess } = useCopyToClipboard()
  const { value: fullProof } = useProofResult()

  if (fullProof == null) return <Loader />

  const downloadProof = () => {
    const file = new Blob([fullProof], { type: 'application/octet-stream' })
    const element = document.createElement('a')
    element.href = URL.createObjectURL(file)
    element.download = 'anonklub-proof.bin'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    URL.revokeObjectURL(element.href)
  }

  return (
    <div className='mt-[70px] flex flex-col items-center justify-center'>
      <h2 className='header'>Proof Results</h2>

      <div className='text-grey'>{ellipsify(fullProof.toString(), 100)}</div>
      {copySuccess}
      <div className='buttons-row'>
        <button
          type='button'
          onClick={() => copyToClipboard(fullProof.toString())}
          className='btn btn-primary'
        >
          Copy to Clipboard
        </button>
        <button
          type='button'
          onClick={downloadProof}
          className='btn btn-primary'
        >
          Download as Text File
        </button>
      </div>
    </div>
  )
}
