import { useState } from 'react'

export const useCopyToClipboard = () => {
  const [copySuccess, setCopySuccess] = useState('')
  const copyToClipboard = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => setCopySuccess('Copied!'))
      .catch(() => setCopySuccess('Failed to copy'))
  }

  return { copySuccess, copyToClipboard }
}
