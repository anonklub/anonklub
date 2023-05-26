import { useEffect, useState } from 'react'
import { config } from '#'
import { ProofRequest } from '@anonset/membership'
import { useStore } from './useStore'

export const useProofRequest = () => {
  const { anonSet } = useStore()
  const [message, setMessage] = useState('')
  const [rawSignature, setRawSignature] = useState('')
  const [proofRequest, setProofRequest] = useState<ProofRequest | null>(null)

  const canSign = message !== '' && rawSignature === ''
  const canSubmit = rawSignature !== '' && anonSet !== null

  useEffect(() => {
    if (message === '' || rawSignature === '' || anonSet?.length === 0) return

    setProofRequest(
      new ProofRequest({
        addresses: anonSet as string[],
        message,
        rawSignature,
        url: config.urls.proveApi,
      }),
    )
  }, [canSign, canSubmit, message, rawSignature, anonSet])

  return {
    canSign,
    canSubmit,
    message,
    proofRequest,
    rawSignature,
    setMessage,
    setRawSignature,
  }
}
